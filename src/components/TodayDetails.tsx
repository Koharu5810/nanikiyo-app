import { BaseWeatherDetailsProps } from "./WeatherOutfitCard";

type TodayDetailsProps = BaseWeatherDetailsProps & {
  humidity?: number;
  windSpeed?: number;
  uv?: {
    level: string;
  };
};