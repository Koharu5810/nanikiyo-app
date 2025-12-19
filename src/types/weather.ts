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

// 1日分の予報（One Call の daily[] の要素）
export type DailyWeather = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

// 予報レスポンス（One Call の返り値のうち使う部分だけ）
export type WeatherForecast = {
  daily: DailyWeather[];
};