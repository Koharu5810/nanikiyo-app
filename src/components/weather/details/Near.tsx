import "@/styles/weather/details.css";
import type { BaseWeatherDetailsProps } from "@/components/weather/Card";
import { WeatherMainBlock } from "@/components/weather/parts/WeatherMainBlock";
import { WeatherMetaBlock } from "@/components/weather/parts/WeatherMetaBlock";

type NearDetailsProps = BaseWeatherDetailsProps & {
  accordionData?: {
    humidity?: number;
    windSpeed?: number;
    uvLabel?: string;
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
