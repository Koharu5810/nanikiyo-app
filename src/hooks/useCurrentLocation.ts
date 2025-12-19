// 現在地の緯度・経度を取得
export function useCurrentLocation(
  onSuccess: (lat: number, lon: number) => void
) {
  const getCurrentLocation = () => {
    console.log("📍 getCurrentLocation called");

    if (!navigator.geolocation) {
      console.log("❌ geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(({coords}) => {
        console.log("📍 position success", coords);
      onSuccess(coords.latitude, coords.longitude);
    });
  };

  return { getCurrentLocation };
}
