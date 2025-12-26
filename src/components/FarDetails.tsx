import type { BaseWeatherDetailsProps } from "./WeatherOutfitCard";
import { WeatherDetailsLayout } from "./WeatherDetailsLayout";
import { WeatherSummary } from "./WeatherSummary";
import { OutfitSummary } from "./OutfitSummary";

export function FarDetails({
  weatherIcon,
  maxTemp,
  minTemp,
  precipitation,
  outfit,
}: BaseWeatherDetailsProps) {
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
        </>
      }
      outfit={<OutfitSummary icon={outfit.icon} label={outfit.label} />}
    />
  );
}