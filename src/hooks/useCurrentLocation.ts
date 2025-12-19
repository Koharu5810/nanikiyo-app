// 現在地の緯度・経度を取得
export function useCurrentLocation(
  onSuccess: (lat: number, lon: number) => void
) {
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(({coords}) => {
      onSuccess(coords.latitude, coords.longitude);
    });
  };

  return { getCurrentLocation };
}
