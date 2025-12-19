import { useEffect, useState } from 'react'
import './styles/sanitize.css'
import './styles/global.css'
import { useWeather } from './hooks/useWeather';
import { useCurrentLocation } from "./hooks/useCurrentLocation";
import { useLocationSearch } from './hooks/useLocationSearch';
import { useWeatherTabs } from './hooks/useWeatherTabs';
import type { GeoLocation } from "./types/location";
import { WeatherInfo } from "./components/WeatherInfo";
import { WeatherForecast } from './components/WeatherForecast';

function App() {
  const {
    weather,
    forecast,
    loading,
    error,
    fetchByCoords,
    fetchForecastByCoords,
    resetWeather,
  } = useWeather();

  const {
    candidates,
    debounceTimerRef,
    selectLocation,
    searchLocations,
  } = useLocationSearch();

  const { getCurrentLocation } = useCurrentLocation(
    fetchByCoords,
    fetchForecastByCoords,
  );

  const [place, setPlace] = useState('');
  const [selectedLocationLabel, setSelectedLocationLabel] = useState<string>('');

  // 地名候補クリック→天気取得
  const fetchWeatherByLocation = (loc: GeoLocation) => {
    resetWeather();
    selectLocation();
    setPlace('');

    setSelectedLocationLabel(`${loc.name} （${loc.state}）`);
    fetchByCoords(loc.lat, loc.lon);
    fetchForecastByCoords(loc.lat, loc.lon);
  };

  // タブ選択
  const { activeTab, setActiveTab } = useWeatherTabs();
  const [hasFetchedCurrent, setHasFetchedCurrent] = useState(false);

  // 現在地タブ用
  useEffect(() => {
    if (activeTab !== 'current' || hasFetchedCurrent) return;

    getCurrentLocation();
    setHasFetchedCurrent(true);
  }, [activeTab, hasFetchedCurrent]);

  // 地域検索タブ用 複数候補検索用
  useEffect(() => {
    if (!place.trim()) {
      selectLocation();
      return;
    }

    // 既存のタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      searchLocations(place);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [place]);

  // タブのラベル
  const weatherLabel =
    activeTab === 'current' ? '現在地' : selectedLocationLabel;

  return (
    <div className="app">
      <div className="app-inner">
        <header className="header">
          <h1 className="title">nanikiyo</h1>
          <p className="subtitle">今日何着よ？</p>

          {/* サンプルカラー テスト表示用 */}
          <div className="color-wrapper">
            <span className="color-sample main-color"></span>
            <span className="color-sample sub-color"></span>
            <span className="color-sample sunny"></span>
            <span className="color-sample cloud"></span>
            <span className="color-sample rain"></span>
          </div>
        </header>

        <main className="main">
          <section className="card">
            {/* タブ */}
            <div className="tabs">
              <button
                className={`tab ${activeTab === "current" ? "active" : ""}`}
                onClick={() => setActiveTab("current")}
              >
                現在地
              </button>

              <button
                className={`tab ${activeTab === "custom" ? "active" : ""}`}
                onClick={() => setActiveTab("custom")}
              >
                地域検索
              </button>
            </div>

            {/* コンテンツ */}
            <div className="tab-content">
              {/* 現在地タブ */}
              {activeTab === "current" && (
                <div>

                  {loading && <p className="helper-text">取得中...</p>}
                  {error && <p className="helper-text error">{error}</p>}

                  {activeTab === "current" && weather && (
                    <WeatherInfo
                      weather={weather}
                      label={weatherLabel}
                    />
                  )}

                  {activeTab === "current" && forecast && forecast.length > 0 && (
                    <WeatherForecast daily={forecast} />
                  )}
                </div>
              )}

              {/* 任意地点タブ */}
              {activeTab === "custom" && (
                <div>
                  <p className="label">地域を入力</p>
                  <div className="search-wrapper">
                    <input
                      type="text"
                      placeholder="例：東京"
                      className="input"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      onFocus={() => {
                        if (place.trim()) {
                          searchLocations(place); // オートコンプリート用
                        }
                      }}
                    />

                    {candidates.length > 0 && (
                      <ul className="candidate-list">
                        {candidates.map((loc, index) => (
                          <li
                            key={`${loc.lat}-${loc.lon}-${index}`}
                            // className="candidate-item"
                            className="autocomplete-item"
                            onClick={() => fetchWeatherByLocation(loc)}
                          >
                            {loc.name} （{loc.state}）
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {loading && <p className="helper-text">取得中...</p>}
                  {error && <p className="helper-text error">{error}</p>}

                  {activeTab === "custom" && weather && selectedLocationLabel && (
                    <WeatherInfo
                      weather={weather}
                      label={weatherLabel}
                    />
                  )}

                  {activeTab === "custom" && forecast && forecast.length > 0 && selectedLocationLabel && (
                    <WeatherForecast daily={forecast} />
                  )}
                </div>
              )}
            </div>

            <p>ここにおすすめの服装が表示されます</p>
          </section>
        </main>

        <footer className="footer">
          <small>© nanikiyo</small>
        </footer>
      </div>
    </div>
  );
}

export default App
