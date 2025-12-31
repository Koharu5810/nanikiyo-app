type FeelsLikeArgs = {
  temp: number;
  weatherMain: string;  // Rain/Snow/Clear
  windSpeed: number;
};

// 天気によって体感気温を下げる
export function feelsLikeForOutfit({
  temp,
  weatherMain,
  windSpeed,
}: FeelsLikeArgs) {
  let result = temp;

  if (weatherMain === "rain") {
    result -= 2;
  }

  if (weatherMain === "snow") {
    result -= 3;
  }

  if (windSpeed >= 6) {
    result -= 3;
  } else if (windSpeed >= 3) {
    result -= 1;
  }

  return Math.round(result);
}
