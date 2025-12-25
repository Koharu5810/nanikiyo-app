import type { DailyWeatherView } from "@/types/weather";
import type { OutfitView } from "@/types/outfit";

type WeatherCardVariant = "today" | "near" | "far";

type Props = {
  day: DailyWeatherView;
  variant: WeatherCardVariant;
  dateLabel: string;    // 今日、明日、明後日
};

export type BaseWeatherDetailsProps = {
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  outfit: OutfitView;
};

// const getDayLabelText = (dayOffset: number) => {
//   if (dayOffset === 0) return "今日";
//   if (dayOffset === 1) return "明日";
//   if (dayOffset === 2) return "明後日";
//   return "";
// }

export function WeatherOutfitCard({ day, variant, dateLabel }: Props) {
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
    <div className={`card card-${variant}`}>
      <Header label={dateLabel} icon={weatherIcon} />

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


      {/* <div className="weather-outfit-card"> */}
        {/* 左：日付・天気 */}
        {/* <div className="card-left">
          <div className="data-badge">
            <p className="label">{getDayLabelText(day.dayOffset)}</p>
            <p className="date">{day.dateText}</p>
          </div> */}

          {/* <div className="weather-info">
            <img src={`/icons/weather/${day.weatherIcon}.svg`} alt="" /> */}

            {/* <p className="temp">
              <span className="max">
                {day.maxTemp} */}
                {"\u00b0"}C
                {/* ℃のユニコードu2103を利用するより組み合わせたほうが文字化けに強いらしい */}
              {/* </span>
              <span> / </span>
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
        </div> */}

        {/* 右：服装 */}
        {/* <div className="card-right">
          <img
            src={`/icons/outfit/${day.outfit.icon}.svg`}
            alt={day.outfit.label}
            className="outfit-icon"
          />
          <p className="outfit-label">{day.outfit.label}</p>
        </div>
      </div> */}
    </div>
  );
}