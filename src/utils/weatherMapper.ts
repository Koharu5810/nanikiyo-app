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
  //    - 12:00 の weatherIcon
  //    - dateText
  //    - label ("today" | "future")

  // 4. 必要な日数（days）だけ返す

  return [];
};

// 日付ごとにforecastをまとめる
function groupForecastByDate(
  list: ForecastApiResponse["list"]
): Record<string, ForecastApiResponse["list"]> {
  return {};
}

// その日の代表アイコン（12:00時点）を取得
function pickNoonWeatherIcon(
  items: ForecastApiResponse["list"]
): string {
  return "";
}

// 降水確率の平均を計算
function calcAveragePrecipitation(
  items: ForecastApiResponse["list"]
): number {
  return 0;
}

// 表示用の日付文字列を作る
function formatDateText(date: Date): string {
  return "";
}