import "@/styles/weather/details.css";
import type { BaseWeatherDetailsProps } from "@/components/weather/Card";
import { WeatherSummary } from "@/components/weather/parts/WeatherSummary";

export function FarDetails({
  weatherIcon,
  maxTemp,
  minTemp,
  precipitation,
}: BaseWeatherDetailsProps) {
  return (
    <div className="near-weather-block">
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
    </div>
  );
}
