export type FeelsLikeArgs = {
  temp: number;
  weatherMain: string;  // Rain/Snow/Clear
  windSpeed: number;
};

export type FeelsLikeResult = {
  value: number;
  reasons: string[];
};

const FOG_WEATHERS = ["fog", "mist", "haze"] as const;

const WEATHER_RULES: Record<string, { value: number; reason: string }> = {
  rain: { value: -1, reason: "雨で体感気温が下がりそう" },
  snow: { value: -3, reason: "雪でかなり寒そう" },
  ...Object.fromEntries(
    FOG_WEATHERS.map((w) => [w, { value: -1, reason: "霧でひんやりしそう" }])
  ),
};

// 天気によって体感気温を下げる
export function feelsLikeForOutfit({
  temp,
  weatherMain,
  windSpeed,
}: FeelsLikeArgs): FeelsLikeResult {
  let value = temp;
  const reasons: string[] = [];

  const normalized = weatherMain.toLowerCase();

  const rule = WEATHER_RULES[normalized];
  if (rule) {
    value += rule.value;
    reasons.push(rule.reason);
  }

  if (windSpeed >= 6) {
    value -= 3;
    reasons.push("風が強く、体感気温が下がりそう");
  } else if (windSpeed >= 3) {
    value -= 1;
    reasons.push("やや風があり、少し寒く感じそう");
  }

  return {
    value: Math.round(value),
    reasons,
  };
}
