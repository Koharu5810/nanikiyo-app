// 現在地⇔任意地点タブ切替
import { useState } from "react";

export type WeatherTab = "current" | "custom";

export function useWeatherTabs() {
  const [activeTab, setActiveTab] = useState<WeatherTab>("current");

  return {
    activeTab,
    setActiveTab,
  };
}
