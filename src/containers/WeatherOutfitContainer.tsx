import { useEffect, useRef, useState } from "react";
import { WeatherOutfitPage } from "@/components/weather/Page";
import { useWeather } from "@/hooks/useWeather";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useWeatherTabs } from "@/hooks/useWeatherTabs";
import { useDailyWeather } from "@/hooks/useDailyWeather";
import type { GeoLocation } from "@/types/location";

export function WeatherOutfitContainer() {
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

  /* ====================
        検索UI用 state
    ==================== */
  const [place, setPlace] = useState("");
  const [selectedLocationLabel, setSelectedLocationLabel] =
    useState<string>("");

  /* ====================
        地域検索
    ==================== */
  const { candidates, selectLocation, searchLocationsDebounced } =
    useLocationSearch();

  const { getCurrentLocation } = useCurrentLocation(
    fetchCurrentLocationWeather,
    fetchForecastByCoords
  );

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    getCurrentLocation();
  }, [getCurrentLocation]);

  /* ====================
  任意地点検索 → customForecast
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

  /* ====================
          タブ選択
    ==================== */
  const { activeTab, setActiveTab } = useWeatherTabs();

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
      dailyWeather={dailyWeather}
    />
  );
}
