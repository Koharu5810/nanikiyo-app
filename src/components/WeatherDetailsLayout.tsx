type WeatherDetailsLayoutProps = {
  weather: React.ReactNode;
  outfit: React.ReactNode;
};

export function WeatherDetailsLayout({
  weather,
  outfit,
}: WeatherDetailsLayoutProps) {
  return (
    <div className="weather-details-layout">
      {/* 左：天気情報 */}
      <div className="weather-details-left">
        {weather}
      </div>

      {/* 右：服装 */}
      <div className="weather-details-right">
        {outfit}
      </div>
    </div>
  );
}