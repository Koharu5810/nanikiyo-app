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

// 3時間ごとの予報1件
export type ForecastItem = {
  dt: number;       // Unix time（秒）
  dt_tet: string;   // "2025-01-01 12:00:00"
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

// APIレスポンス全体
export type ForecastResponce = {
  list: ForecastItem[];
};