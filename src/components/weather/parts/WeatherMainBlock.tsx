import type { WeatherIconType } from "@/types/weather";
import { WeatherSummary } from "./WeatherSummary";

type WeatherMainBlockProps = {
  weatherIcon: WeatherIconType;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
};

export function WeatherMainBlock(props: WeatherMainBlockProps) {
  return (
    <>
      <img
        src={`/icons/weather/${props.weatherIcon}.svg`}
        alt=""
        className="weather-icon large"
      />
      <WeatherSummary
        maxTemp={props.maxTemp}
        minTemp={props.minTemp}
        precipitation={props.precipitation}
      />
    </>
  );
}