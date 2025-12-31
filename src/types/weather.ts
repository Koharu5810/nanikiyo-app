import type { OutfitView } from "./outfit";
import type { UvLevel } from "./uv";

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

export type WeatherIconType =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "rain"
  | "heavyRain"
  | "snow"
  | "windy"
  | "fog";


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
      humidity: number;
    };
    weather: {
      icon: string;
      main: string;
      description: string;
    }[];
    pop?: number;
    wind?: {
      speed: number;
      deg?: number;
    }
  }[];
};


// ========================
//   App internal models
// ========================

export type DailyWeatherView = {
  dayOffset: number;         // 0 = 今日, 1 = 明日, 2 = 明後日...
  dateLabel: string | undefined; // 表示用日時（今日、明日、明後日）
  dateText: string;          // 表示用日付
  dayOfWeek: string;         // 表示用曜日
  dayOfWeekType: string;     // 表示用曜日種別（土日祝・平日）
  holidayName?: string;
  weatherIcon: WeatherIconType;
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
  outfit: OutfitView;
  feelsLikeForOutfit: number;
};
