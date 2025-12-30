// ブラウザAPI（現在地の緯度・経度を取得）
import { useCallback } from "react";

export function useCurrentLocation(
  fetchByCoords: (lat: number, lon: number) => void,
  fetchForecastByCoords: (lat: number, lon: number) => void
) {
  const getCurrentLocation = useCallback(() => {
    console.log("📍現在地取得処理を開始しました");

    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("📍位置情報の取得に成功しました", position);
      const { latitude, longitude } = position.coords;
      fetchByCoords(latitude, longitude);
      fetchForecastByCoords(latitude, longitude);
    });
  }, [fetchByCoords, fetchForecastByCoords]);

  return { getCurrentLocation };
}
