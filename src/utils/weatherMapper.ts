// データ変換処理

import type {
  ForecastApiResponse,
  DailyWeatherView,
} from "@/types/weather";

/**
 * OpenWeather の forecast API を
 * 日別の表示用データに変換する
 */
export function buildDailyWeatherFromForecast(
  forecast: ForecastApiResponse,
  days: number
): DailyWeatherView[] {
  // 1. forecast.list を日付ごとにグループ化する
  //    { "2025-01-01": ForecastItem[], ... }

  // 2. 今日を dayOffset = 0 として並び替える

  // 3. 各日について DailyWeatherView を作る
  //    - maxTemp / minTemp
  //    - precipitationProbability（平均）
  //    - 12:00 の weatherDescription
  //    - dateText
  //    - label ("today" | "future")

  // 4. 必要な日数（days）だけ返す

  return [];
};

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
  // 該当データが見つからなかった時用初期値
  let result = "";

  items.forEach((item) => {
    if (item.dt_txt.includes("12:00:00")) {
      result = item.weather[0]?.description ?? "";
    }
  });

  return result
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
  const weekday = weekdays[date.getDate()];

  return `${month} / ${day} (${weekday})`;
}