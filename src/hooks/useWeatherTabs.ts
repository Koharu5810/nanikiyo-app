// 現在地⇔任意地点タブ切替

import { useEffect, useState } from "react";

export type WeatherTab = "current" | "custom";

export function useWeatherTabs(onTabChange: () => void) {
  const [activeTab, setActiveTab] = useState<WeatherTab>("current");

  // タブ切替時に表示をリセット
  useEffect(() => {
    onTabChange();
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
  };
}
