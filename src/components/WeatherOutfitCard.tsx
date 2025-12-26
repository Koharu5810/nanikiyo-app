import type { DailyWeatherView } from "@/types/weather";
import type { OutfitView } from "@/types/outfit";
import type { UvLevel } from "@/types/uv";
import { Header } from "./Header";
import { TodayDetails } from "./TodayDetails";
import { NearDetails } from "./NearDetails";
import { FarDetails } from "./FarDetails";

type WeatherCardVariant = "today" | "near" | "far";

type Props = {
  day: DailyWeatherView;
  variant: WeatherCardVariant;
};

const uvLevelLabelMap: Record<UvLevel, string> = {
  low: "弱い",
  moderate: "中",
  high: "強い",
  very_high: "非常に強い",
  extreme: "警戒",
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

  const uvLabel = uv ? uvLevelLabelMap[uv.level] : undefined;

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
          uvLabel={uvLabel}
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
            uvLabel,
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