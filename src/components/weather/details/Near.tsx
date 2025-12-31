import "@/styles/weather/details.css";
import type { BaseWeatherDetailsProps } from "@/components/weather/Card";
import type { FeelsLikeResult } from "@/utils/feelsLikeForOutfit";
import { WeatherMainBlock } from "@/components/weather/parts/WeatherMainBlock";
import { WeatherMetaBlock } from "@/components/weather/parts/WeatherMetaBlock";
import type { UvLevel } from "@/types/uv";

type NearDetailsProps = BaseWeatherDetailsProps & {
  accordionData?: {
    humidity?: number;
    windSpeed?: number;
    uv?: {
      level: UvLevel;
    }
    feelsLike?: FeelsLikeResult;
  };
};

export function NearDetails(props: NearDetailsProps) {
  return (
    <div className="weather-block">
      <WeatherMainBlock {...props} />

      <details className="weather-accordion">
        <summary className="accordion-summary">詳細を見る</summary>
        <WeatherMetaBlock {...props.accordionData} />
      </details>
    </div>
  );
}
