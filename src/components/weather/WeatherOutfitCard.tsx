import type { DailyWeatherView } from "@/types/weather";

type Props = {
  day: DailyWeatherView;
};

export function WeatherOutfitCard({ day }: Props) {
  return (
    <div className="weather-outfit-card">

      {/* 左：日付・天気 */}
      <div className="card-left">
        <div className="data-badge">
          <p className="label">{day.label === "today" ? "今日" : "明日"}</p>
          <p className="date">{day.dateText}</p>
        </div>

        <div className="weather-info">
          <img
            src={`/icons/weather/${day.weatherIcon}.svg`}
            alt=""
          />

          <p className="temp">
            <span className="max">
              {day.maxTemp}
              {"\u00b0"}C
            </span>
            <span className="min">
              {day.minTemp}
              {"\u00b0"}C
            </span>
          </p>

          <p>降水 {day.precipitationProbability}%</p>
          {day.humidity && <p>湿度 {day.humidity}%</p>}
          {day.windSpeed && <p>風 {day.windSpeed}m</p>}
          {day.uv && <p>UV {day.uv.level}</p>}
        </div>
      </div>

      {/* 右：服装 */}
      <div className="card-right">
        <img
          src={`/icons/outfit/${day.outfit.icon}.svg`}
          alt={day.outfit.label}
          className="outfit-icon"
        />
        <p className="outfit-label">
          {day.outfit.label}
        </p>
      </div>
    </div>
  );
}