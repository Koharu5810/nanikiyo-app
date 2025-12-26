import type { BaseWeatherDetailsProps } from "@/components/weather/Card";
import { WeatherDetailsLayout } from "@/components/weather/layout/DetailsLayout";
import { WeatherSummary } from "@/components/weather/parts/WeatherSummary";
import { OutfitSummary } from "@/components/weather/parts/OutfitSummary";
import type { WeatherIconType } from "@/types/weather";

type TodayDetailsProps = BaseWeatherDetailsProps & {
  weatherIcon: WeatherIconType;
  humidity?: number;
  windSpeed?: number;
  uvLabel?: string;
};

export function TodayDetails({
  weatherIcon,
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
        <div className="today-weather-block">
          <img
            src={`/icons/weather/${weatherIcon}.svg`}
            alt=""
            className="weather-icon large"
          />
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
        </div>
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
