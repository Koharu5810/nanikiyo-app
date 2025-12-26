import type { BaseWeatherDetailsProps } from "./WeatherOutfitCard";
import { WeatherDetailsLayout } from "./WeatherDetailsLayout";
import { WeatherSummary } from "./WeatherSummary";
import { OutfitSummary } from "./OutfitSummary";

type TodayDetailsProps = BaseWeatherDetailsProps & {
  humidity?: number;
  windSpeed?: number;
  uvLabel?: string;
};

export function TodayDetails({
  maxTemp,
  minTemp,
  precipitation,
  humidity,
  windSpeed,
  uvLabel,
  outfit,
}: TodayDetailsProps) {
  return (
    <WeatherDetailsLayout
      weather={
        <WeatherSummary
          maxTemp={maxTemp}
          minTemp={minTemp}
          precipitation={precipitation}
          items={
            <>
              {humidity !== undefined && (
                <li className="meta-item">
                  <span className="icon">湿度 💧 </span>
                  <span>{humidity}%</span>
                </li>
              )}

              {windSpeed !== undefined && (
                <li className="meta-item">
                  <span className="icon">風 🌬️ </span>
                  <span>{windSpeed}m</span>
                </li>
              )}

              {uvLabel && (
                <li className="meta-item">
                  <span className="icon">UV 🕶️ </span>
                  <span>{uvLabel}</span>
                </li>
              )}
            </>
          }
        />
      }
      outfit={
        <OutfitSummary
          icon={outfit.icon}
          label={outfit.label}
          // description={outfit.description}
        />
      }
    />
  );
}