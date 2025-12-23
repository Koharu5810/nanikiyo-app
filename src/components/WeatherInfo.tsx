import type { WeatherData } from "@/types/weather";

type Props = {
  weather: WeatherData;
  label: string;
};

export function WeatherInfo({ weather, label }: Props) {
  return (
    <div className="weather-info" style={{ marginTop: "12px" }}>
      <p>📍 {label}</p>

      <p>
        🌡️ {Math.round(weather.main.temp)}
        {"\u00b0"}C
          (体感 {Math.round(weather.main.feels_like)}
        {"\u00b0"}C)
        {/* ℃のユニコードu2103を利用するより組み合わせたほうが文字化けに強いらしい */}
      </p>

      <p>☁️ {weather.weather[0].description}</p>
      <p>💨 風速 {weather.wind.speed} m/s</p>
      <p>💧 湿度 {weather.main.humidity}%</p>
    </div>
  );
}