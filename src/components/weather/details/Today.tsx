import "@/styles/weather/details.css";
import type { WeatherIconType } from "@/types/weather";
import type { BaseWeatherDetailsProps } from "@/components/weather/Card";
import type { FeelsLikeResult } from "@/utils/feelsLikeForOutfit";
import { WeatherMainBlock } from "@/components/weather/parts/WeatherMainBlock";
import { WeatherMetaBlock } from "@/components/weather/parts/WeatherMetaBlock";

type TodayDetailsProps = BaseWeatherDetailsProps & {
  weatherIcon: WeatherIconType;
  humidity?: number;
  windSpeed?: number;
  uvLabel?: string;
  feelsLike?: FeelsLikeResult;
};

export function TodayDetails(props: TodayDetailsProps) {
  return (
    <div className="weather-block">
      <WeatherMainBlock {...props} />
      <WeatherMetaBlock {...props} />
    </div>
  );
}
