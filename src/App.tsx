import { useEffect, useRef, useState } from 'react'
import '@/styles/sanitize.css'
import '@/styles/global.css'
import { useWeather } from '@/hooks/useWeather';
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useWeatherTabs } from '@/hooks/useWeatherTabs';
import type { GeoLocation } from "@/types/location";
import { WeatherOutfitList } from "@/components/WeatherOutfitList";
import { useDailyWeather } from './hooks/useDailyWeather';
import type { ForecastApiResponse } from './types/weather';

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

  /* ====================
      タブ・ラベル管理
  ==================== */
  // タブ選択
  const { activeTab, setActiveTab } = useWeatherTabs();
  const hasFetchedCurrentRef = useRef(false);
  const currentLocationLabelRef = useRef<string>("現在地");

  // ↓エラーコメント回避用タグ
  // eslint-disable-next-line react-hooks/refs
  const currentLocationLabel = currentLocationLabelRef.current;

  /* ====================
      検索UI用 state
  ==================== */
  const [place, setPlace] = useState("");
  const [selectedLocationLabel, setSelectedLocationLabel] =
    useState<string>("");

  /* ====================================
      forecastを2系統で保持（現在地・任意地点）
  ==================================== */
  const [currentForecast, setCurrentForecast] =
    useState<ForecastApiResponse | null>(null);
  const [customForecast, setCustomForecast] =
    useState<ForecastApiResponse | null>(null);

  /* ====================
      どちらの取得か判定
  ==================== */
  const [isCurrentWeather, setIsCurrentWeather] = useState(true);

  /* ====================
      dailyWeather 生成
  ==================== */
  const { currentDailyWeather, customDailyWeather } = useDailyWeather(
    currentForecast,
    customForecast
  );

  /* ====================
      地域検索
  ==================== */
  const { candidates, selectLocation, searchLocationsDebounced } =
    useLocationSearch();

  const { getCurrentLocation } = useCurrentLocation(
    fetchByCoords,
    fetchForecastByCoords
  );

  /* ====================
      任意地点検索 → customForecast
  ==================== */
  // 地名候補クリック→天気取得
  const fetchWeatherByLocation = (loc: GeoLocation) => {
    resetWeather();
    selectLocation();
    setPlace("");

    setIsCurrentWeather(false);
    setSelectedLocationLabel(`${loc.name} （${loc.state}）`);

    fetchByCoords(loc.lat, loc.lon);
    fetchForecastByCoords(loc.lat, loc.lon);
  };

  /* ====================
    現在地点初回取得
  ==================== */
  useEffect(() => {
    if (activeTab !== "current") return;
    if (hasFetchedCurrentRef.current) return;

    setIsCurrentWeather(true);
    getCurrentLocation();
    hasFetchedCurrentRef.current = true;
  }, [activeTab, getCurrentLocation]);

  /* ====================
      forecast を振り分けて保存
  ==================== */
  useEffect(() => {
    if (!forecast) return;

    if (isCurrentWeather) {
      setCurrentForecast(forecast);
    } else {
      setCustomForecast(forecast);
    }
  }, [forecast, isCurrentWeather]);

  /* ====================
      現在地タブのラベル更新
  ==================== */
  useEffect(() => {
    if (!weather) return;
    if (!isCurrentWeather) return;

    currentLocationLabelRef.current = weather.name ?? "現在地";
  }, [weather, isCurrentWeather]);

  /* =========================
    地域検索タブオートコンプリート
  ========================= */
  useEffect(() => {
    if (!place.trim()) {
      selectLocation();
      return;
    }

    searchLocationsDebounced(place);
  }, [place, selectLocation, searchLocationsDebounced]);

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
                {currentLocationLabel}
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

                  {currentDailyWeather.length > 0 && (
                    <WeatherOutfitList days={currentDailyWeather} />
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
                          searchLocationsDebounced(place); // オートコンプリート用
                        }
                      }}
                    />

                    {candidates.length > 0 && (
                      <ul className="candidate-list">
                        {candidates.map((loc, index) => (
                          <li
                            key={`${loc.lat}-${loc.lon}-${index}`}
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

                  {customDailyWeather.length > 0 && selectedLocationLabel && (
                    <WeatherOutfitList days={customDailyWeather} />
                  )}
                </div>
              )}
            </div>
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
