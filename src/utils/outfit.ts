import type { OutfitType, OutfitView, } from "@/types/outfit";
import { OUTFIT_MASTER } from "@/types/outfit";

type UseOutfitParams = {
  baseTemp: number;
  feelsLike?: number;
};

type TempRule = {
  min: number;
  type: OutfitType;
};

export function getOutfitByTemp({
  baseTemp,
}: UseOutfitParams): OutfitView {

  const type =
    TEMP_RULES.find(rule => baseTemp >= rule.min)?.type ??
    "down_jacket";

  return {
    type,
    ...OUTFIT_MASTER[type],
  }
}

export const TEMP_RULES: TempRule[] = [
  { min: 30, type: "sleeveless" },
  { min: 28, type: "short_sleeve" },
  { min: 25, type: "three_quarter_sleeve" },
  { min: 22, type: "long_sleeve" },
  { min: 19, type: "mock_neck" },
  { min: 16, type: "cardigan" },
  { min: 14, type: "jacket" },
  { min: 12, type: "light_coat" },
  { min: 8, type: "wool_coat" },
  { min: -Infinity, type: "down_jacket" },
] as const;
