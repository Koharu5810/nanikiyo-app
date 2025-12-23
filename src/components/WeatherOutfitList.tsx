import type { DailyWeatherView } from "@/types/weather";
import { WeatherOutfitCard } from "./WeatherOutfitCard";

type Props = {
  days: DailyWeatherView[];
};

export function WeatherOutfitList({ days }: Props) {
  return (
    <div className="weather-outfit-list">
      {days.map((day) => (
        <WeatherOutfitCard
          key={day.dayOffset}
          day={day}
        />
      ))}
    </div>
  );
}
