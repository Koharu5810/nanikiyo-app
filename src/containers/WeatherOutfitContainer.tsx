import { useEffect, useMemo, useRef, useState } from "react";
import { WeatherOutfitPage } from "@/components/weather/Page";
import { useWeather } from "@/hooks/useWeather";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useWeatherTabs } from "@/hooks/useWeatherTabs";
import { useDailyWeather } from "@/hooks/useDailyWeather";
import type { GeoLocation } from "@/types/location";

export function WeatherOutfitContainer() {
  /* ====================
      外部ロジック（hooks）
  ==================== */
  const {
    forecast,
    locationLabel: currentLocationLabel,
    loading,
    error,
    fetchCurrentLocationWeather,
    fetchWeatherByCoords,
    fetchForecastByCoords,
    resetWeather,
  } = useWeather();

  const { dailyWeather } = useDailyWeather(forecast);
  const { activeTab, setActiveTab } = useWeatherTabs();
  const { candidates, selectLocation, searchLocationsDebounced } =
    useLocationSearch(); // 地域検索

  /* ====================
        UIの状態
    ==================== */
  // 地域検索
  const [place, setPlace] = useState("");
  const [selectedLocationLabel, setSelectedLocationLabel] =
    useState<string>("");

  /* ====================
        フラグ・DOM系
    ==================== */
  const hasFetchedRef = useRef(false);

  /* ====================
        副作用
  ==================== */
  const { getCurrentLocation } = useCurrentLocation(
    fetchCurrentLocationWeather,
    fetchForecastByCoords
  );

  useEffect(() => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    getCurrentLocation();
  }, [getCurrentLocation]);

  // 地域検索タブオートコンプリート
  useEffect(() => {
    if (!place.trim()) {
      selectLocation();
      return;
    }
    searchLocationsDebounced(place);
  }, [place, selectLocation, searchLocationsDebounced]);

  /* ====================
      イベント・アクション
    ==================== */
  // 地名候補クリック→天気取得
  const fetchWeatherByLocation = (loc: GeoLocation) => {
    resetWeather();
    selectLocation();
    setPlace("");

    setSelectedLocationLabel(`${loc.name} （${loc.state}）`);

    fetchWeatherByCoords(loc.lat, loc.lon);
    fetchForecastByCoords(loc.lat, loc.lon);
  };

  // 地域検索バリデーション
  const searchError = useMemo (() => {
    const trimmed = place.trim();
    const invalidPattern = /[^a-zA-Zぁ-んァ-ン一-龥\s]/;

    // 未入力
    if (!trimmed) return null;
    // 1文字はNG
    if (trimmed.length < 2) return "2文字以上入力してください";
    // 入力文字種の制限
    if (invalidPattern.test(trimmed)) return "使用できない文字が含まれています";

    return null;
  }, [place]);

  useEffect(() => {
    const trimmed = place.trim();

    if (searchError) {
      selectLocation();
      return
    }

    if (!trimmed) {
      selectLocation();
      return;
    }

    searchLocationsDebounced(trimmed);
  }, [place, searchError, selectLocation, searchLocationsDebounced])


  /* ====================
          JSX
  ==================== */
  return (
    <WeatherOutfitPage
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentLocationLabel={currentLocationLabel}
      selectedLocationLabel={selectedLocationLabel}
      dailyWeather={dailyWeather}
      loading={loading}
      error={error}
      place={place}
      setPlace={setPlace}
      candidates={candidates}
      onSelectLocation={fetchWeatherByLocation}
      searchLocationsDebounced={searchLocationsDebounced}
      searchError={searchError}
    />
  );
}
