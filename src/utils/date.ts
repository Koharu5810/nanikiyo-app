import { JP_HOLIDAYS } from "./jpHolidays";

export type DayOfWeekType = "weekday" | "sun" | "sat" | "holiday";

// 表示用の日付文字列を作る
export function formatMonthDay(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}
export function getDayOfWeek(date: Date): string {
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return weekdays[date.getDay()];
}

// 祝日判定
export function getHolidayName(date: Date): string | undefined {
  const key = date.toISOString().split("T")[0];
  return JP_HOLIDAYS[key];
}
export function isHoliday(date: Date): boolean {
  return Boolean(getHolidayName(date));
}
export function getDayOfWeekType(date: Date): DayOfWeekType {
  if (getHolidayName(date)) return "holiday"

  const day = date.getDay();
  if (day === 0) return "sun";
  if (day === 6) return "sat";
  return "weekday";
}
