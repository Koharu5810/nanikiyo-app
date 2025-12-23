// 現在地の緯度・経度を取得

import { useCallback } from "react";

export function useCurrentLocation(
  fetchByCoords: (lat: number, lon: number) => void,
  fetchForecastByCoords: (lat: number, lon: number) => void
) {
  const getCurrentLocation = useCallback(() => {
    console.log("📍 getCurrentLocation called");

    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("📍 position success", position);
      const { latitude, longitude } = position.coords;
      fetchByCoords(latitude, longitude);
      fetchForecastByCoords(latitude, longitude);
    });
  }, [fetchByCoords, fetchForecastByCoords]);

  return { getCurrentLocation };
}
