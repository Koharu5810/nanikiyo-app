// データ変換処理

import type {
  ForecastApiResponse,
  DailyWeatherView,
  WeatherIconType,
} from "@/types/weather";
import { useOutfit } from "@/hooks/useOutfit";

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

  // 3. 各日について DailyWeatherView を作る
  return dates.slice(0, days).map((date, index) => {
    const items = grouped[date];

    const temps = items.map((i) => i.main.temp);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);

    const description = pickNoonWeatherDescription(items);
    const weatherIcon = mapWeatherToIconType(description);

    const precipitationProbability = calcAveragePrecipitation(items);

    const dateText = formatDateText(new Date(date));

    const outfit = useOutfit({
      temp: maxTemp,
    });

    return {
      label: index === 0 ? "today" : "future",
      dayOffset: index,
      dateText,
      weatherIcon,
      maxTemp,
      minTemp,
      precipitationProbability,
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

// その日の代表天気（12:00時点）を取得
function pickNoonWeatherDescription(
  items: ForecastApiResponse["list"]
): string {
  const noonItem = items.find((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return noonItem?.weather[0]?.description ?? "";
  // return result
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

// 表示用の日付文字列を作る
function formatDateText(date: Date): string {
  const month = date.getMonth() + 1;  // 0始まりなので+1する
  const day = date.getDate();

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  return `${month} / ${day} (${weekday})`;
}

/**
 * OpenWeather の description / main から
 * アプリ用の天気アイコンタイプを決める
 */
export function mapWeatherToIconType(
  description: string,
  windSpeed?: number
): WeatherIconType {
  const text = description.toLowerCase();

  // 風速で決める
  if (windSpeed !== undefined && windSpeed >= 8) {
    return "windy";
  }
  if (text.includes("heavy rain") || text.includes("storm")) {
    return "heavyRain";
  }
  if (text.includes("rain")) {
    return "rain";
  }
  if (text.includes("snow")) {
    return "snow";
  }
  if (text.includes("few clouds")) {
    return "partlyCloudy";
  }
  if (text.includes("cloud")) {
    return "cloudy";
  }

  return "sunny";
}