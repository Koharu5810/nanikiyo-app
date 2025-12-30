import { useState } from "react";
import "@/styles/weather/page.css";
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
  dailyWeather: DailyWeatherView[];

  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  searchError: string | null;
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
  dailyWeather,
  activeIndex,
  setActiveIndex,
  searchError,
}: Props) {
  const [hoverTab, setHoverTab] = useState<"current" | "custom" | null>(null);

  return (
    <section className="page-section">
      {/* タブ */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "current" ? "active" : ""}`}
          onClick={() => setActiveTab("current")}
          onMouseEnter={() => setHoverTab("current")}
          onMouseLeave={() => setHoverTab(null)}
        >
          {currentLocationLabel}
        </button>

        <button
          className={`tab ${activeTab === "custom" ? "active" : ""}`}
          onClick={() => setActiveTab("custom")}
          onMouseEnter={() => setHoverTab("custom")}
          onMouseLeave={() => setHoverTab(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide tab-icon"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          地域検索
        </button>

        <span
          className={`tab-indicator ${
            (hoverTab ?? activeTab) === "custom" ? "right" : "left"
          } ${hoverTab ? "hover" : ""}`}
        />
      </div>

      {/* カード（タブごと） */}
      <div className="weather-content">
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
            {dailyWeather.length > 0 && (
              <WeatherOutfitList days={dailyWeather} />
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
                className={`search-input ${
                  candidates.length > 0 ? "has-candidates" : ""
                }`}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onFocus={() => {
                  if (place.trim()) {
                    searchLocationsDebounced(place); // オートコンプリート用
                  }
                }}
                onKeyDown={(e) => {
                  if (candidates.length === 0) return;

                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((prev) =>
                      Math.min(prev + 1, candidates.length - 1)
                    );
                  }

                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((prev) => Math.max(prev - 1, 0));
                  }

                  if (e.key === "Enter" && activeIndex >= 0) {
                    e.preventDefault();
                    onSelectLocation(candidates[activeIndex]);
                    setActiveIndex(-1);
                  }
                }}
              />

              {searchError && (
                <p className="helper-text error">{searchError}</p>
              )}

              {candidates.length > 0 && (
                <ul className="autocomplete-list">
                  {candidates.map((loc, index) => (
                    <li
                      key={`${loc.lat}-${loc.lon}-${index}`}
                      className={`autocomplete-item ${
                        index === activeIndex ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => {
                        onSelectLocation(loc);
                        setActiveIndex(-1);
                      }}
                    >
                      {loc.name} （{loc.state}）
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {selectedLocationLabel && (
              <p className="selected-location-label">
                📍 {selectedLocationLabel}
              </p>
            )}

            {dailyWeather.length > 0 && selectedLocationLabel && (
              <WeatherOutfitList days={dailyWeather} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
