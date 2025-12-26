import { useEffect, useRef, useState } from "react";
import "@/styles/sanitize.css";
import "@/styles/global.css";
import { WeatherOutfitPage } from "@/components/weather/WeatherOutfitPage";
import { useWeather } from "@/hooks/useWeather";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useWeatherTabs } from "@/hooks/useWeatherTabs";
import { useDailyWeather } from "@/hooks/useDailyWeather";
import type { GeoLocation } from "@/types/location";
import type { ForecastApiResponse } from "@/types/weather";

export function WeatherOutfitContainer() {
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
    <WeatherOutfitPage
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentLocationLabel={currentLocationLabel}
      loading={loading}
      error={error}
      place={place}
      setPlace={setPlace}
      candidates={candidates}
      onSelectLocation={fetchWeatherByLocation}
      searchLocationsDebounced={searchLocationsDebounced}
      selectedLocationLabel={selectedLocationLabel}
      currentDailyWeather={currentDailyWeather}
      customDailyWeather={customDailyWeather}
    />
  );
}
