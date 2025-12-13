type WeatherLocation = {
  name: string;
  state?: string;
  country?: string;
  lat: number;
  lon: number;
};
type WeatherData = {
  temp: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  humidity?: number;
  pressure?: number;
  description?: string;
  icon?: string;
  wind_speed?: number;
};
