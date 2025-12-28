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
    <>
      {humidity !== undefined && (
        <li className="meta-item">
          <span className="icon">湿度 💧 </span>
          <span>{humidity}%</span>
        </li>
      )}

      {windSpeed !== undefined && (
        <li className="meta-item">
          <span className="icon">風 🌬️ </span>
          <span>{windSpeed}m</span>
        </li>
      )}

      {uvLabel && (
        <li className="meta-item">
          <span className="icon">UV 🕶️ </span>
          <span>{uvLabel}</span>
        </li>
      )}
    </>
  );
}