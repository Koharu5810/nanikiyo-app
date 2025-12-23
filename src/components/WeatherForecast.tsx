// 3日間天気の一覧表示

import type { DailyWeatherView } from "../types/weather";

type Props = {
  daily: DailyWeatherView[];
};

export const WeatherForecast = ({ daily }: Props) => {
  return (
    <div className="forecast">
      {daily.map((day) => (
        <div key={day.dayOffset} className="forecast-day">
          <p>{day.dateText}</p>

          <p>icon: {day.weatherIcon}</p>

          <p>
            {day.maxTemp} / {day.minTemp} {"\u00b0"}C
          </p>

          <p>rain: {day.precipitationProbability}%</p>
        </div>
      ))}
    </div>
  );
};
