import type { ComponentType } from "react";
import { OutfitUmbrellaIcon } from "@/components/icons/OutfitUmbrellaIcon";

export type AccessoryType =
  | "scarf"
  | "mittens"
  | "hat"
  | "beanie"
  | "umbrella"
  | "sunglasses";

export type AccessoryView = {
  type: AccessoryType;
  label: string;
  icon?: string;
  IconComponent?: ComponentType<{ className?: string }>;
};

export const ACCESSORY_MASTER: Record<string, AccessoryView> = {
  scarf: { type: "scarf", label: "マフラー", icon: "scarf" },
  mittens: { type: "mittens", label: "手袋", icon: "mittens" },
  hat: { type: "hat", label: "帽子", icon: "hat" },
  beanie: { type: "beanie", label: "ニット帽", icon: "beanie" },
  sunglasses: { type: "sunglasses", label: "サングラス", icon: "sunglasses" },
  umbrella: {
    type: "umbrella",
    label: "傘",
    IconComponent: OutfitUmbrellaIcon,
  },
};
