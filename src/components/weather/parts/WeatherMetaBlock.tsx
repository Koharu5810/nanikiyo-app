import { DropletsIcon, WindSpeedIcon, GlassIcon } from "@/components/icons/ui";
import type { FeelsLikeResult } from "@/utils/feelsLikeForOutfit";
import { UvIndicator } from "./UvIndicator";
import type { UvLevel } from "@/types/uv";

type WeatherMetaBlockProps = {
  humidity?: number;
  windSpeed?: number;
  uv?: {
    level: UvLevel;
  }
  feelsLike?: FeelsLikeResult;
};

export function WeatherMetaBlock({
  humidity,
  windSpeed,
  uv,
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

      {uv && (
        <li className="meta-item uv">
          <span className="label">
            UV
            <GlassIcon />
          </span>
          <UvIndicator level={uv.level} />
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