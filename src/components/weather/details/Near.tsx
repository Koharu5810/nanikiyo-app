import type { BaseWeatherDetailsProps } from "../Card";
import { WeatherDetailsLayout } from "../layout/DetailsLayout";
import { WeatherSummary } from "../parts/WeatherSummary";
import { OutfitSummary } from "../parts/OutfitSummary";

type NearDetailsProps = BaseWeatherDetailsProps & {
  accordionData?: {
    humidity?: number;
    windSpeed?: number;
    uvLabel?: string;
  };
};

export function NearDetails({
  weatherIcon,
  maxTemp,
  minTemp,
  precipitation,
  outfit,
  accordionData,
}: NearDetailsProps) {
  const hasAccordionContent =
    accordionData?.humidity !== undefined ||
    accordionData?.windSpeed !== undefined ||
    accordionData?.uvLabel !== undefined;

  return (
    <WeatherDetailsLayout
      weather={
        <>
          <img
            src={`/icons/weather/${weatherIcon}.svg`}
            alt=""
            className="weather-icon large"
          />
          <WeatherSummary
            maxTemp={maxTemp}
            minTemp={minTemp}
            precipitation={precipitation}
          />

          {hasAccordionContent && (
            <details className="weather-accordion">
              <summary className="accordion-summary">詳細を見る</summary>

              <ul className="weather-meta">
                {accordionData?.humidity !== undefined && (
                  <li className="meta-item">
                    <span className="icon">湿度 💧 </span>
                    <span>{accordionData.humidity}%</span>
                  </li>
                )}

                {accordionData?.windSpeed !== undefined && (
                  <li className="meta-item">
                    <span className="icon">風 🌬️ </span>
                    <span>{accordionData.windSpeed}m</span>
                  </li>
                )}

                {accordionData.uvLabel && (
                  <li className="meta-item">
                    <span className="icon">UV 🕶️ </span>
                    <span>{accordionData.uvLabel}</span>
                  </li>
                )}
              </ul>
            </details>
          )}
        </>
      }
      outfit={<OutfitSummary icon={outfit.icon} label={outfit.label} />}
    />
  );
}
