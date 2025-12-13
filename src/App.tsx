import { useEffect, useRef, useState } from 'react'
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
    local_names?: {
      ja?: string;
    };
  };

  type GeoApiResponse = {
    results?: {
      name: string;
      admin1?: string;
      latitude: number;
      longitude: number;
    }[];
  };

  const [place, setPlace] = useState('');
  const [weather, setWeather] = useState<OpenWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [candidates, setCandidates] = useState<GeoLocation[]>([]);
  const [selectedLocationLabel, setSelectedLocationLabel] = useState<string>('');

  const debounceTimerRef = useRef<number | null>(null); // debounce（打つたびにAPIを叩かないための必須技術）用

  const uniqueLocations = (locations: GeoLocation[]) => {
    const map = new Map<string, GeoLocation>();

    locations.forEach((loc) => {
      const key = `${loc.name}_${loc.state ?? ''}`;
      if (!map.has(key)) {
        map.set(key, loc);
      }
    });

    return Array.from(map.values());
  };

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

  // 現在地の緯度・経度を取得
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("現在地を取得できません");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        setLoading(false);
        setError("位置情報の取得が許可されませんでした");
      }
    );
  };

  // 地名検索（候補取得）
  const searchLocations = async () => {
    if (!place.trim()) {
      setError("地名を入力してください");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setCandidates([]);

      // openWeatherは city name 直指定だと日本語で不安定のため、Geocoding API を挟んで緯度経度ベースで取得
      // 1）地名→緯度経度（Geocoding API）
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          place
        )}&count=5&language=ja`
      );

      if (!geoRes.ok) {
        throw new Error("位置情報の取得に失敗しました");
      }

      const geoData: GeoApiResponse = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("地名が見つかりませんでした");
        return;
      }

      const locations:GeoLocation[] = geoData.results.map((r) => ({
        name: r.name,
        state: r.admin1,
        lat: r.latitude,
        lon: r.longitude,
      }));

      setCandidates(uniqueLocations(locations));

    } catch (err) {
      console.log(err);
      setError('位置情報の取得中にエラーが発生しました')
    } finally {
      setLoading(false);
    }
  };

  // 地名候補クリック→天気取得
  const fetchWeatherByLocation = async (loc: GeoLocation) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      setSelectedLocationLabel(`${loc.name} （${loc.state}）`);

      // 2）緯度経度→天気取得
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${API_KEY}&units=metric&lang=ja`
      );

      if (!weatherRes.ok) {
        throw new Error("天気情報の取得に失敗しました");
      }

      const weatherData: OpenWeatherResponse = await weatherRes.json();
      setWeather(weatherData);
      setCandidates([]);  // 他候補は消す
    } catch (err) {
      console.log(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
      );

      if (!weatherRes.ok) {
        throw new Error();
      }

      const weatherData: OpenWeatherResponse = await weatherRes.json();
      setWeather(weatherData);
      setSelectedLocationLabel("現在地");
    } catch (err) {
      console.log(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState<"current" | "custom">("current");

  useEffect(() => {
    if (!place.trim()) {
      setCandidates([]);
      return;
    }

    // 既存のタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      searchLocations();
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [place]);

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
                地域検索
              </button>
            </div>

            {/* コンテンツ */}
            <div className="tab-content">
              {activeTab === "current" && (
                <div>
                  <button
                    className="search-button"
                    onClick={getCurrentLocation}
                  >
                    現在地の天気を取得
                  </button>

                  {loading && <p className="helper-text">取得中...</p>}
                  {error && <p className="helper-text error">{error}</p>}

                  {weather && (
                    <div style={{ marginTop: "12px" }}>
                      <p>📍 現在地</p>
                      <p>
                        🌡️ {Math.round(weather.main.temp)}
                        {"\u00b0"}C (体感 {Math.round(weather.main.feels_like)}
                        {"\u00b0"}C)
                        {/* ℃のユニコードu2103を利用するより組み合わせたほうが文字化けに強いらしい */}
                      </p>
                      <p>☁️{weather.weather[0].description}</p>
                      <p>💨 風速 {weather.wind.speed} m/s</p>
                      <p>💧 湿度 {weather.main.humidity}%</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "custom" && (
                <div>
                  <p className="label">地域を入力</p>
                  <div className="search-wrapper">
                    <input
                      type="text"
                      placeholder="例：東京"
                      className="input"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      onFocus={() => {
                        if (place.trim()) {
                          searchLocations(); // オートコンプリート用
                        }
                      }}
                    />

                    {candidates.length > 0 && (
                      <ul className="candidate-list">
                        {candidates.map((loc, index) => (
                          <li
                            key={`${loc.lat}-${loc.lon}-${index}`}
                            // className="candidate-item"
                            className="autocomplete-item"
                            onClick={() => fetchWeatherByLocation(loc)}
                          >
                            {loc.name} （{loc.state}）
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {loading && <p className="helper-text">取得中...</p>}
                  {error && <p className="helper-text error">{error}</p>}

                  {weather && (
                    <div style={{ marginTop: "12px" }}>
                      <p>📍 {selectedLocationLabel}</p>
                      <p>
                        🌡️ {Math.round(weather.main.temp)}
                        {"\u00b0"}C (体感 {Math.round(weather.main.feels_like)}
                        {"\u00b0"}C)
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
