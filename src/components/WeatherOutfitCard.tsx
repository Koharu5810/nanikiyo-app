import type { DailyWeatherView } from "@/types/weather";
import type { OutfitView } from "@/types/outfit";
import { Header } from "./Header";
import { TodayDetails } from "./TodayDetails";
import { NearDetails } from "./NearDetails";
import { FarDetails } from "./FarDetails";

type WeatherCardVariant = "today" | "near" | "far";

type Props = {
  day: DailyWeatherView;
  variant: WeatherCardVariant;
  // dateLabel: string;    // 今日、明日、明後日
};

export type BaseWeatherDetailsProps = {
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  outfit: OutfitView;
};

export function WeatherOutfitCard({ day, variant }: Props) {
  const {
    weatherIcon,
    maxTemp,
    minTemp,
    precipitationProbability,
    humidity,
    windSpeed,
    uv,
    outfit,
  } = day;

  return (
    <div className={`weather-card weather-card-${variant}`}>
      <Header label={day.dateLabel} icon={weatherIcon} />

      {variant === "today" && (
        <TodayDetails
          maxTemp={maxTemp}
          minTemp={minTemp}
          precipitation={precipitationProbability}
          humidity={humidity}
          windSpeed={windSpeed}
          uv={uv}
          outfit={outfit}
        />
      )}

      {variant === "near" && (
        <NearDetails
          maxTemp={maxTemp}
          minTemp={minTemp}
          precipitation={precipitationProbability}
          accordionData={{
            humidity,
            windSpeed,
            uv,
          }}
          outfit={outfit}
        />
      )}

      {variant === "far" && (
        <FarDetails
          maxTemp={maxTemp}
          minTemp={minTemp}
          precipitation={precipitationProbability}
          outfit={outfit}
        />
      )}
    </div>
  );
}