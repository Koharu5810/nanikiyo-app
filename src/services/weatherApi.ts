// Laravel APIを叩く関数
async function SearchLocations(query: string): Promise<WeatherLocation[]> {
  const res = await fetch(
    `/api/weather/search?query=${encodeURIComponent(query)}`
  );
  if (!res.ok) {
    throw new Error(`検索APIエラー: ${res.status}`);
  }
  const json = await res.json();
  return json.data as WeatherLocation[];
}
async function GetCurrentWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const res = await fetch(`/api/weather/current?lat=${lat}&lon=${lon}`);
  if (!res.ok) {
    throw new Error(`天気APIエラー: ${res.status}`);
  }
  const json = await res.json();
  return json.data as WeatherData;
}
