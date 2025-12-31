import type { UvLevel } from "@/types/uv";

export const UV_DISPLAY: Record<
  UvLevel,
  {
    label: string;
    color: string;
  }
> = {
  low: {
    label: "弱い",
    color: "#4A90E2",
  },
  moderate: {
    label: "普通",
    color: "#4CAF50",
  },
  high: {
    label: "やや強い",
    color: "#F5A623",
  },
  very_high: {
    label: "強い",
    color: "#D0021B",
  },
  extreme: {
    label: "非常に強い",
    color: "#9013FE",
  },
};