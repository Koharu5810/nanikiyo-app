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

export type UvLevel =
  | "low"
  | "moderate"
  | "high"
  | "very_high"
  | "extreme";

export type OutfitType =
  | "short_sleeve"
  | "long_sleeve"
  | "light_outer"
  | "outer"
  | "down";

export type WeatherIconType =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "rain"
  | "heavyRain"
  | "snow"
  | "windy";


// ========================
// OpenWeather API response
// ========================

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
    pop?: number;
  }[];
};


// ========================
//   App internal models
// ========================

export type DailyWeatherView = {
  label: "today" | "future";
  dayOffset: number;         // 0 = 今日, 1 = 明日, 2 = 明後日...
  dateText: string;          // 表示用日付
  weatherIcon: string;
  maxTemp: number;
  minTemp: number;
  diffMaxTemp?: number;
  diffMinTemp?: number;
  precipitationProbability: number; // 降水確率（％）
  humidity?: number;         // 湿度
  windSpeed?: number;
  uv?: {
    index?: number;          // 紫外線強度（数値）
    level: UvLevel;          // 表示・判定用
  };
  outfit: {
    type: OutfitType;
    label: string;
    icon: string;
  };
};
