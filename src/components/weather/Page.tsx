import "@/styles/sanitize.css";
import "@/styles/global.css";
import type { GeoLocation } from "@/types/location";
import type { DailyWeatherView } from "@/types/weather";
import { WeatherOutfitList } from "@/components/weather/List";

type Props = {
  activeTab: "current" | "custom";
  setActiveTab: (tab: "current" | "custom") => void;
  currentLocationLabel: string;
  loading: boolean;
  error: string;

  place: string;
  setPlace: (v: string) => void;
  candidates: GeoLocation[];
  searchLocationsDebounced: (v: string) => void;
  onSelectLocation: (loc: GeoLocation) => void;
  selectedLocationLabel: string;

  currentDailyWeather: DailyWeatherView[];
  customDailyWeather: DailyWeatherView[];
};

export function WeatherOutfitPage({
  activeTab,
  setActiveTab,
  currentLocationLabel,
  loading,
  error,
  place,
  setPlace,
  candidates,
  searchLocationsDebounced,
  onSelectLocation,
  selectedLocationLabel,
  currentDailyWeather,
  customDailyWeather,
}: Props) {
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
          <section className="page-card">
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

            {/* カード（タブごと） */}
            <div className="tab-content">
              {/* 共通・ローディング/エラー */}
              {(loading || error) && (
                <>
                  {loading && <p className="helper-text">取得中...</p>}
                  {error && <p className="helper-text error">{error}</p>}
                </>
              )}

              {/* 現在地タブ */}
              {activeTab === "current" && (
                <div>
                  {currentDailyWeather.length > 0 && (
                    <WeatherOutfitList days={currentDailyWeather} />
                  )}
                </div>
              )}

              {/* 任意地点タブ */}
              {activeTab === "custom" && (
                <div>
                  <p className="search-label">地域を入力</p>
                  <div className="search-wrapper">
                    <input
                      type="text"
                      placeholder="例：東京"
                      className="search-input"
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
                            onClick={() => onSelectLocation(loc)}
                          >
                            {loc.name} （{loc.state}）
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

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
