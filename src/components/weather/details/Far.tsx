import type { BaseWeatherDetailsProps } from "@/components/weather/Card";
import { WeatherDetailsLayout } from "@/components/weather/layout/DetailsLayout";
import { WeatherSummary } from "@/components/weather/parts/WeatherSummary";
import { OutfitSummary } from "@/components/weather/parts/OutfitSummary";

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
