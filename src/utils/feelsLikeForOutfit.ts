export type FeelsLikeArgs = {
  temp: number;
  weatherMain: string; // Rain/Snow/Clear
  windSpeed: number;
};

export type FeelsLikeResult = {
  value: number;
  reasons: string[];
};

type ReasonContext = {
  baseTemp: number;
  feelsLike: number;
  weatherMain: string;
  windSpeed: number;
};

export function buildFeelsLikeReasons({
  feelsLike,
  weatherMain,
  windSpeed,
}: ReasonContext): string[] {
  const reasons: string[] = [];
  const normalized = weatherMain.toLowerCase();

  // 天候系
  if (normalized === "rain") {
    reasons.push("雨で体感気温が下がりそう");
  }
  if (normalized === "snow") {
    reasons.push("雪でかなり寒そう");
  }
  if (["fog", "mist", "haze"].includes(normalized)) {
    reasons.push("霧でひんやりしそう");
  }

  // 風
  if (windSpeed >= 6) {
    reasons.push("風が強く、寒さが際立ちそう");
  } else if (windSpeed >= 3) {
    reasons.push("やや風があり、肌寒いかも");
  }

  // 暑さ系
  if (feelsLike >= 30) {
    reasons.push("かなり暑く、熱中症に注意");
  } else if (feelsLike >= 27) {
    reasons.push("蒸し暑く感じそう");
  }

  return reasons;
}

const FOG_WEATHERS = ["fog", "mist", "haze"] as const;

const WEATHER_RULES: Record<string, number> = {
  rain: -1,
  snow: -3,
  ...Object.fromEntries(FOG_WEATHERS.map((w) => [w, -1])),
};

// 天気によって体感気温を下げる
export function feelsLikeForOutfit({
  temp,
  weatherMain,
  windSpeed,
}: FeelsLikeArgs): FeelsLikeResult {
  let value = temp;
  const normalized = weatherMain.toLowerCase();

  value += WEATHER_RULES[normalized] ?? 0;

  if (windSpeed >= 6) {
    value -= 3;
  } else if (windSpeed >= 3) {
    value -= 1;
  }

  const rounded = Math.round(value);

  return {
    value: rounded,
    reasons: buildFeelsLikeReasons({
      baseTemp: temp,
      feelsLike: rounded,
      weatherMain,
      windSpeed,
    }),
  };
}
