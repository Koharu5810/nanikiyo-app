type WeatherMetaBlockProps = {
  humidity?: number;
  windSpeed?: number;
  uvLabel?: string;
}

export function WeatherMetaBlock({
  humidity,
  windSpeed,
  uvLabel,
}: WeatherMetaBlockProps) {
  return (
    <ul className="weather-meta-list">
      {humidity !== undefined && (
        <li className="meta-item">
          <span className="label">湿度 💧 </span>
          <span>{humidity}%</span>
        </li>
      )}

      {windSpeed !== undefined && (
        <li className="meta-item">
          <span className="label">風 🌬️ </span>
          <span>{windSpeed}m</span>
        </li>
      )}

      {uvLabel && (
        <li className="meta-item">
          <span className="label">UV 🕶️ </span>
          <span>{uvLabel}</span>
        </li>
      )}
    </ul>
  );
}