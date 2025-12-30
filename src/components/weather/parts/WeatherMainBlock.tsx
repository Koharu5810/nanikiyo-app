import type { WeatherIconType } from "@/types/weather";
import { UmbrellaIcon } from "@/components/icons/ui";

type WeatherMainBlockProps = {
  weatherIcon: WeatherIconType;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
};

export function WeatherMainBlock({
  weatherIcon,
  maxTemp,
  minTemp,
  precipitation,
}: WeatherMainBlockProps) {
  return (
    <div className="weather-main">
      {/* 天気アイコン */}
      <img
        src={`/icons/weather/${weatherIcon}.svg`}
        alt=""
        className="weather-icon large"
      />

      {/* 気温 */}
      <div className="temp-row">
        <span className="temp-max content">{maxTemp}</span>
        <span className="temp-degree">{"\u00b0"}C</span>
        <span className="temp-separator"> / </span>
        <span className="temp-min content">{minTemp}</span>
        <span className="temp-degree">{"\u00b0"}C</span>
      </div>

      {/* 降水情報 */}
      <div className="precipitation meta-item">
        <span className="label">
          降水
          <UmbrellaIcon />
        </span>
        <span className="content">{precipitation}%</span>
      </div>
    </div>
  );
}
