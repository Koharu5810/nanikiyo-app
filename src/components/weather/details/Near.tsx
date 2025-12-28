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
    <div className="near-weather-block">
      <div className="weather-main">
        <WeatherMainBlock {...props} />
      </div>

      <details className="weather-accordion">
        <summary className="accordion-summary">詳細を見る</summary>
        <ul className="weather-meta-list">
          <WeatherMetaBlock {...props.accordionData} />
        </ul>
      </details>
    </div>
  );
}
