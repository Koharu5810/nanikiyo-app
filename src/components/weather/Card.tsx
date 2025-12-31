import "@/styles/weather/card.css";
import type { DailyWeatherView, WeatherIconType } from "@/types/weather";
import { TodayDetails } from "./details/Today";
import { NearDetails } from "./details/Near";
import { FarDetails } from "./details/Far";
import { OutfitSummary } from "./parts/OutfitSummary";

type WeatherCardVariant = "today" | "near" | "far";

type Props = {
  day: DailyWeatherView;
  variant: WeatherCardVariant;
};

export type BaseWeatherDetailsProps = {
  weatherIcon: WeatherIconType;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
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
    feelsLikeForOutfit,
    outfit,
  } = day;

  return (
    <div className={`weather-card weather-card-${variant}`}>
      <div className="weather-details-layout">
        {/* 左 */}
        <div className="weather-details-left">
          <div className={`date-badge ${day.dayOfWeekType}`}>
            <div className="day-label">{day.dateLabel}</div>
            <div className="day-text">{day.dateText}</div>
            <div className="day-week">({day.dayOfWeek})</div>
          </div>
          {day.holidayName && (
            <div className="holiday-label">{day.holidayName}</div>
          )}
        </div>

        {/* 中央 */}
        <div className="weather-details-center">
          {variant === "today" && (
            <TodayDetails
              weatherIcon={weatherIcon}
              maxTemp={maxTemp}
              minTemp={minTemp}
              precipitation={precipitationProbability}
              humidity={humidity}
              windSpeed={windSpeed}
              uv={uv}
              feelsLike={feelsLikeForOutfit}
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
                uv,
                feelsLike: feelsLikeForOutfit,
              }}
            />
          )}

          {variant === "far" && (
            <FarDetails
              weatherIcon={weatherIcon}
              maxTemp={maxTemp}
              minTemp={minTemp}
              precipitation={precipitationProbability}
            />
          )}
        </div>

        {/* 右 */}
        <div className="weather-details-right">
          <OutfitSummary
            icon={outfit.icon}
            label={outfit.label}
            // description={outfit.description}
          />
        </div>
      </div>
    </div>
  );
}
