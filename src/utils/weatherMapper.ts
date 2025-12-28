// データ変換処理
import type {
  ForecastApiResponse,
  DailyWeatherView,
  WeatherIconType,
} from "@/types/weather";
import { useOutfit } from "@/hooks/useOutfit";
import type { UvLevel } from "@/types/uv";

/**
 * OpenWeather の forecast API を
 * 日別の表示用データに変換する
 */
export function buildDailyWeatherFromForecast(
  forecast: ForecastApiResponse,
  days: number
): DailyWeatherView[] {
  // 1. forecast.list を日付ごとにグループ化する
  const grouped = groupForecastByDate(forecast.list);

  // 2. 今日を dayOffset = 0 として並び替える
  const dates = Object.keys(grouped).sort();

  const getDayLabelText = (dayOffset: number): string | undefined => {
    if (dayOffset === 0) return "今日";
    if (dayOffset === 1) return "明日";
    if (dayOffset === 2) return "明後日";
    return undefined;
  };

  // 3. 各日について DailyWeatherView を作る
  return dates.slice(0, days).map((date, index) => {
    const items = grouped[date];
    const dateObj = new Date(date);

    const temps = items.map((i) => i.main.temp);
    const maxTemp = Math.ceil(Math.max(...temps)); // 小数点切り上げ
    const minTemp = Math.floor(Math.min(...temps)); // 小数点切り下げ

    const precipitationProbability = calcAveragePrecipitation(items);
    const windSpeed = calcAverageWindSpeed(items);
    const humidity = calcAverageHumidity(items);
    const uv = estimateUvLevel(items);

    // その日の代表天気（12:00時点）を取得
    const noonItem =
      items.find((item) => item.dt_txt.includes("12:00:00")) ?? items[0];
    const weatherIcon = mapWeatherToIconType(
      noonItem.weather[0].main,
      noonItem.weather[0].description,
      windSpeed
    );

    const outfit = useOutfit({
      temp: maxTemp,
    });

    return {
      dayOffset: index,
      dateLabel: getDayLabelText(index),
      dateText: formatMonthDay(dateObj),
      dayOfWeek: getDayOfWeek(dateObj),
      weatherIcon,
      maxTemp,
      minTemp,
      precipitationProbability,
      humidity,
      windSpeed,
      uv,
      outfit,
    };
  });
}

// 日付ごとにforecastをまとめる
function groupForecastByDate(
  list: ForecastApiResponse["list"]
): Record<string, ForecastApiResponse["list"]> {
  const grouped: Record<string, ForecastApiResponse["list"]> = {};

  list.forEach((item) => {
    // 例）"2025-01-01 12:00:00" → "2025-01-01"
    const date = item.dt_txt.split(" ")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(item);
  });

  return grouped;
}

// 表示用の日付文字列を作る
function formatMonthDay(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}
function getDayOfWeek(date: Date): string {
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return weekdays[date.getDay()];
}

// 降水確率の平均を計算
function calcAveragePrecipitation(
  items: ForecastApiResponse["list"]
): number {
  let total = 0;
  let count = 0;

  items.forEach((item) => {
    if (typeof item.pop === "number") {
      total += item.pop;
      count += 1;
    }
  });

  // データが1件もなかった場合は表示上0%にする
  if (count === 0) return 0;

  // 0〜1 → 0〜100 に変換して四捨五入
  return Math.round((total / count) * 100);
}

// 平均風速を計算
function calcAverageWindSpeed(
  items: ForecastApiResponse["list"]
): number | undefined {
  const speeds = items
    .map((item) => item.wind?.speed)
    .filter((v): v is number => typeof v === "number");  // v is numberは型ガード

  if (speeds.length === 0) return undefined;

  const avg =
    speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;

  return Math.round(avg * 10) / 10;
}

// 平均湿度を計算
function calcAverageHumidity(
  items: ForecastApiResponse["list"]
): number | undefined {
  const humidities = items
    .map((item) => item.main?.humidity)
    .filter((v): v is number => typeof v === "number");

  if (humidities.length === 0) return undefined;

  const avg = humidities.reduce((sum, h) => sum + h, 0) / humidities.length;

  return Math.round(avg);
}

// UVレベルを天気から推定
function estimateUvLevel(
  items: ForecastApiResponse["list"]
): { level: UvLevel } | undefined {
  const noon =
    items.find((item) => item.dt_txt.includes("12:00:00")) ?? items[0];

  const main = noon.weather[0].main.toLowerCase();

  if (main === "clear") return { level: "high" };
  if (main === "clouds") return { level: "moderate" };
  return { level: "low" };
}

// OpenWeatherのmainからアプリ用の天気アイコンタイプを決める
export function mapWeatherToIconType(
  main: string,
  description?: string,
  windSpeed?: number
): WeatherIconType {
  const mainText = main.toLowerCase();
  const descText = description?.toLowerCase() ?? "";

  // 風が強い場合（平均8m/s以上）は風優先
  if (windSpeed !== undefined && windSpeed >= 8) {
    return "windy";
  }

  if (mainText === "rain" && descText.includes("heavy")) {
    return "heavyRain";
  }
  if (mainText === "rain" || mainText === "drizzle") {
    return "rain";
  }
  if (mainText === "snow") {
    return "snow";
  }
  if (["mist", "fog", "haze"].includes(mainText)) {
    return "fog";
  }
  if (
    mainText === "clouds" &&
    (descText.includes("few") || descText.includes("scattered")) 
  ) {
    return "partlyCloudy";
  }
  if (mainText === "clouds") {
    return "cloudy";
  }
  if (mainText === "clear") {
    return "sunny";
  }

  return "sunny";
}