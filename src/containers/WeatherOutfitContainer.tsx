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
    fetchByCoords,
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
    fetchByCoords,
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

    fetchByCoords(loc.lat, loc.lon);
    fetchForecastByCoords(loc.lat, loc.lon);
  };

  /* ====================
        タブ・ラベル管理
    ==================== */
  // タブ選択
  const { activeTab, setActiveTab } = useWeatherTabs();
  // タブ切り替えのたびに現在地取得を防ぐ
  // const hasFetchedCurrentRef = useRef(false);

  // const [currentLocationLabel, setCurrentLocationLabel] =
  //   useState<string>("現在地");

  /* ====================
      現在地点初回取得
    ==================== */
  // useEffect(() => {
  //   if (activeTab !== "current") return;
  //   if (hasFetchedCurrentRef.current) return;

  //   setIsCurrentWeather(true);
  //   getCurrentLocation();
  //   hasFetchedCurrentRef.current = true;
  // }, [activeTab, getCurrentLocation])

  /* ====================
        現在地タブのラベル更新
    ==================== */
  // useEffect(() => {
  //   if (!weather) return;
  //   if (!isCurrentWeather) return;

  //   setCurrentLocationLabel(weather.name ?? "現在地");
  // }, [weather, isCurrentWeather]);

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
