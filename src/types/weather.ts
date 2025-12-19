export type WeatherLocation = {
  name: string;
  state?: string;
  country?: string;
  lat: number;
  lon: number;
};

export type WeatherData = {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};
