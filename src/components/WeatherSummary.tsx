type WeatherSummaryProps = {
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  items?: React.ReactNode;
};

export function WeatherSummary({
  maxTemp,
  minTemp,
  precipitation,
  items,
}: WeatherSummaryProps) {
  return (
    <div className="weather-summary">
      {/* 気温 */}
      <div className="temp-row">
        <span className="temp-max">
          {maxTemp}
          {"\u00b0"}C
        </span>
        <span className="temp-separator"> / </span>
        <span className="temp-min">
          {minTemp}
          {"\u00b0"}C
        </span>
      </div>

      {/* 降水情報 */}
      <ul className="weather-meta">
        <li>
          <span className="icon">降水 ☂️ </span>
          <span>{precipitation}%</span>
        </li>
        {items}
      </ul>
    </div>
  );
}