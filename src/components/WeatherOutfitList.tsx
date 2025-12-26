import type { DailyWeatherView } from "@/types/weather";
import { WeatherOutfitCard } from "./WeatherOutfitCard";

type Props = {
  days: DailyWeatherView[];
};

export function WeatherOutfitList({ days }: Props) {
  return (
    <div className="weather-outfit-list">
      {days.map((day) => {
        const variant =
          day.dayOffset === 0
            ? "today"
            : day.dayOffset <= 2
              ? "near"
              : "far";

        return (
          <WeatherOutfitCard
            key={day.dayOffset}
            day={day}
            variant={variant}
          />
        );
      })}
    </div>
  );
}
