import "@/styles/weather/details.css";
import type { BaseWeatherDetailsProps } from "@/components/weather/Card";
import { WeatherMainBlock } from "@/components/weather/parts/WeatherMainBlock";

export function FarDetails(props: BaseWeatherDetailsProps) {
  return (
    <div className="far-weather-block">
      <WeatherMainBlock {...props} />
    </div>
  );
}
