export function useWeatherSearch() {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const search = async (query: string) => { ... };
  const selectLocation = async (loc: WeatherLocation) => { ... };

  return { locations, weather, status, search, selectLocation };
}
