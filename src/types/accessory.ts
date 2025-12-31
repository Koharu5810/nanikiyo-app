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
  icon: string;
};

export const ACCESSORY_MASTER: Record<
  AccessoryType,
  { label: string; icon: string }
> = {
  scarf: { label: "マフラー", icon: "scarf" },
  mittens: { label: "手袋", icon: "mittens" },
  hat: { label: "帽子", icon: "hat" },
  beanie: { label: "ニット帽", icon: "beanie" },
  umbrella: { label: "傘", icon: "umbrella" },
  sunglasses: { label: "サングラス", icon: "sunglasses" },
};
