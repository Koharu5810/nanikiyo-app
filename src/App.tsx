import { useEffect, useState } from 'react'
import './styles/sanitize.css'
import './styles/global.css'
import { useWeather } from './hooks/useWeather';
import { useLocationSearch } from './hooks/useLocationSearch';
import type { GeoLocation } from "./types/location";

function App() {
  const {
    weather,
    loading,
    error,
    fetchByCoords,
    resetWeather,
  } = useWeather();

  const {
    candidates,
    clearCandidates,
    searchLocations,
    debounceTimerRef
  } = useLocationSearch();


  const [place, setPlace] = useState('');
  const [selectedLocationLabel, setSelectedLocationLabel] = useState<string>('');

  // 現在地の緯度・経度を取得
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchByCoords(latitude, longitude);
      });
  };

  // 地名候補クリック→天気取得
  const fetchWeatherByLocation = (loc: GeoLocation) => {
    resetWeather();

    setSelectedLocationLabel(`${loc.name} （${loc.state}）`);

    fetchByCoords(loc.lat, loc.lon);
  };

  const [activeTab, setActiveTab] = useState<"current" | "custom">("current");

  // 現在地タブ用
  useEffect(() => {
    if (activeTab !== 'current') return;

    getCurrentLocation();
  }, [activeTab]);

  // 地域検索タブ用 複数候補検索用
  useEffect(() => {
    if (!place.trim()) {
      clearCandidates();
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

  // タブ切替時に表示をリセット
  useEffect(() => {
    resetWeather();
    clearCandidates();
  }, [activeTab]);

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
              {activeTab === "current" && (
                <div>
                  {/* <button
                    className="search-button"
                    onClick={getCurrentLocation}
                  >
                    現在地の天気を取得
                  </button> */}

                  {loading && <p className="helper-text">取得中...</p>}
                  {error && <p className="helper-text error">{error}</p>}

                  {weather && (
                    <div style={{ marginTop: "12px" }}>
                      <p>📍 現在地</p>
                      <p>
                        🌡️ {Math.round(weather.main.temp)}
                        {"\u00b0"}C (体感 {Math.round(weather.main.feels_like)}
                        {"\u00b0"}C)
                        {/* ℃のユニコードu2103を利用するより組み合わせたほうが文字化けに強いらしい */}
                      </p>
                      <p>☁️ {weather.weather[0].description}</p>
                      <p>💨 風速 {weather.wind.speed} m/s</p>
                      <p>💧 湿度 {weather.main.humidity}%</p>
                    </div>
                  )}
                </div>
              )}

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

                  {weather && (
                    <div style={{ marginTop: "12px" }}>
                      <p>📍 {selectedLocationLabel}</p>
                      <p>
                        🌡️ {Math.round(weather.main.temp)}
                        {"\u00b0"}C (体感 {Math.round(weather.main.feels_like)}
                        {"\u00b0"}C)
                      </p>
                      <p>☁️ {weather.weather[0].description}</p>
                      <p>💨 風速 {weather.wind.speed} m/s</p>
                      <p>💧 湿度 {weather.main.humidity}%</p>
                    </div>
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
