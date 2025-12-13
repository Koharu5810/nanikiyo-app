import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './styles/sanitize.css'
import './styles/global.css'

function App() {
  type OpenWeatherResponse = {
    name: string;
    weather: {
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  };

  type GeoLocation = {
    name: string;
    lat: number;
    lon: number;
    state?: string;
  };

  const [place, setPlace] = useState('');
  const [weather, setWeather] = useState<OpenWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

  const fetchWeatherByCity = async () => {
    if (!place.trim()) {
      setError('地名を入力してください');
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      // openWeatherは city name 直指定だと日本語で不安定のため、Geocoding API を挟んで緯度経度ベースで取得
      // 1）地名→緯度経度（Geocoding API）
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          `${place},JP`
        )}&limit=5&appid=${API_KEY}`
      );

      if (!geoRes.ok) {
        throw new Error("位置情報の取得に失敗しました");
      }

      const geoData = await geoRes.json();

      const { lat, lon, name } = geoData[0];

      const label = [
        loc.name,
        loc.state ? `（${loc.state}）` : '',
      ].join('');

      // 2）緯度経度→天気取得
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
      );

      if (!weatherRes.ok) {
        throw new Error("天気情報の取得に失敗しました");
      }

      const weatherData: OpenWeatherResponse = await weatherRes.json();
      setWeather(weatherData);
    } catch (err) {
      console.log(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState<"current" | "custom">("current");

  return (
    <div className="app">
      <div className="app-inner">
        <header className="header">
          <h1 className="title">nanikiyo</h1>
          <p className="subtitle">今日何着よ？</p>

          {/* サンプルカラー テスト表示用 */}
          <div className="color-wrapper">
            <span className="color-sample main-color"></span>
            <span className="color-sample sub-color"></span>
            <span className="color-sample sunny"></span>
            <span className="color-sample cloud"></span>
            <span className="color-sample rain"></span>
          </div>
        </header>

        <main className="main">
          <section className="card">
            {/* タブ */}
            <div className="tabs">
              <button
                className={`tab ${activeTab === "current" ? "active" : ""}`}
                onClick={() => setActiveTab("current")}
              >
                現在地
              </button>

              <button
                className={`tab ${activeTab === "custom" ? "active" : ""}`}
                onClick={() => setActiveTab("custom")}
              >
                任意の地名
              </button>
            </div>

            {/* コンテンツ */}
            <div className="tab-content">
              {activeTab === "current" && (
                <div>
                  <p className="label">現在地の天気</p>
                  <p>⛅️ 晴れ / 17{"\u00b0"}C</p>
                  {/* ℃のユニコードu2103を利用するより組み合わせたほうが文字化けに強いらしい */}
                </div>
              )}

              {activeTab === "custom" && (
                <div>
                  <p className="label">場所を指定</p>
                  <input
                    type="text"
                    placeholder="例：東京"
                    className="input"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                  <button
                    className="search-button"
                    onClick={fetchWeatherByCity}
                  >
                    検索
                  </button>

                  {loading && <p>取得中...</p>}
                  {error && <p style={{ color: "red" ,fontSize: "12px" }}>{error}</p>}

                  {weather && (
                    <div style={{ marginTop: "12px" }}>
                      <p>📍 {weather.name}</p>
                      <p>
                        🌡️ {Math.round(weather.main.temp)}{"\u00b0"}C (体感{' '}
                        {Math.round(weather.main.feels_like)}{'\u00b0'}C)
                      </p>
                      <p>☁️{weather.weather[0].description}</p>
                      <p>💨 風速 {weather.wind.speed} m/s</p>
                      <p>💧 湿度 {weather.main.humidity}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p>ここにおすすめの服装が表示されます</p>
          </section>
        </main>

        <footer className="footer">
          <small>© nanikiyo</small>
        </footer>
      </div>
    </div>
  );

}

export default App
