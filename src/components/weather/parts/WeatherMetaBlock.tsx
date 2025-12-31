import { DropletsIcon, WindSpeedIcon, GlassIcon } from "@/components/icons/ui";
import type { FeelsLikeResult } from "@/utils/feelsLikeForOutfit";

type WeatherMetaBlockProps = {
  humidity?: number;
  windSpeed?: number;
  uvLabel?: string;
  feelsLike?: FeelsLikeResult;
};

export function WeatherMetaBlock({
  humidity,
  windSpeed,
  uvLabel,
  feelsLike,
}: WeatherMetaBlockProps) {
  return (
    <ul className="weather-meta-list">
      {humidity !== undefined && (
        <li className="meta-item">
          <span className="label">
            湿度
            <DropletsIcon />
          </span>
          <span className="content">{humidity}%</span>
        </li>
      )}

      {windSpeed !== undefined && (
        <li className="meta-item">
          <span className="label">
            風
            <WindSpeedIcon />
          </span>
          <span className="content">{windSpeed}m</span>
        </li>
      )}

      {uvLabel && (
        <li className="meta-item">
          <span className="label">
            UV
            <GlassIcon />
          </span>
          <span className="content">{uvLabel}</span>
        </li>
      )}

      {feelsLike?.reasons.map((r) => (
        <li key={r} className="meta-item reason">
          ・{r}
        </li>
      ))}
    </ul>
  );
}