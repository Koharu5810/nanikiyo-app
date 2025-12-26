import type { DailyWeatherView, WeatherIconType } from "@/types/weather";
import type { OutfitView } from "@/types/outfit";
import type { UvLevel } from "@/types/uv";
import { Header } from "./Header";
import { TodayDetails } from "./details/TodayDetails";
import { NearDetails } from "./details/NearDetails";
import { FarDetails } from "./details/FarDetails";

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
  weatherIcon: WeatherIconType;
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
      <div className="weather-details-left">
        <Header dayLabel={day.dateLabel} dayText={day.dateText} />
      </div>

      {variant === "today" && (
        <TodayDetails
          weatherIcon={weatherIcon}
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
          weatherIcon={weatherIcon}
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
          weatherIcon={weatherIcon}
          maxTemp={maxTemp}
          minTemp={minTemp}
          precipitation={precipitationProbability}
          outfit={outfit}
        />
      )}
    </div>
  );
}
