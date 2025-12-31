import { ACCESSORY_MASTER, type AccessoryType, type AccessoryView } from "@/types/accessory";
import type { UvLevel } from "@/types/uv"

type AccessoryRuleContext = {
  feelsLike: number;
  windSpeed: number;
  uvLevel?: UvLevel;
  weatherMain: string;
};

export function getAccessories({
  feelsLike,
  windSpeed,
  uvLevel,
  weatherMain,
}: AccessoryRuleContext): AccessoryView[] {
  const accessories: AccessoryType[] = [];

  if (feelsLike <= 10) {
    accessories.push("scarf");
  }
  if (feelsLike <= 8) {
    accessories.push("scarf", "mittens");
  }
  if (feelsLike <= 5) {
    accessories.push("scarf", "mittens", "beanie");
  }

  if (windSpeed >= 6 && feelsLike <= 12) {
    accessories.push("scarf");
  }

  if (weatherMain.toLowerCase() === "rain") {
    accessories.push("umbrella");
  }

  if (uvLevel && ["high", "very_high", "extreme"].includes(uvLevel)) {
    accessories.push("hat", "sunglasses");
  }

  return Array.from(new Set(accessories)).map(
    (type) => ({
      type,
      ...ACCESSORY_MASTER[type],
    })
  );
}