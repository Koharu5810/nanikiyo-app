// 現在地の緯度・経度を取得
export function useCurrentLocation(
  fetchWeather: (lat: number, lon: number) => void,
  fetchForecast: (lat: number, lon: number) => void
) {
  const getCurrentLocation = () => {
    console.log("📍 getCurrentLocation called");

    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("📍 position success", position);
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
      fetchForecast(latitude, longitude);
    });
  };

  return { getCurrentLocation };
}
