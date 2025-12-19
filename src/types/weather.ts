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

// 3日間表示用
export type DailyForecast = {
  date: string;
  temp: number;
  icon: string;
  description: string;
}

// APIレスポンス
export type ForecastApiResponse = {
  list: {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
      description: string;
    }[];
  }[];
};