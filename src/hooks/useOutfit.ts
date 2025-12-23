import type { OutfitType, OutfitView, } from "@/types/outfit";
import { OUTFIT_MASTER } from "@/types/outfit";

type UseOutfitParams = {
  temp: number;
  feelsLike?: number;
};

export function useOutfit({
  temp,
  feelsLike,
}: UseOutfitParams): OutfitView {

  const baseTemp = feelsLike ?? temp;

  const type =
    TEMP_RULES.find(rule => baseTemp >= rule.min)?.type ??
    "down_jacket";

  return {
    type,
    ...OUTFIT_MASTER[type],
  }
}

export const TEMP_RULES: { min: number; type: OutfitType }[] = [
  { min: 30, type: "sleeveless"},
  { min: 28, type: "short_sleeve"},
  { min: 26, type: "three_quarter_sleeve"},
  { min: 22, type: "long_sleeve"},
  { min: 20, type: "cardigan"},
  { min: 16, type: "mock_neck"},
  { min: 14, type: "jacket"},
  { min: 12, type: "duffle_coat"},
  { min: 8, type: "coat"},
  { min: -Infinity, type: "down_jacket"},
];