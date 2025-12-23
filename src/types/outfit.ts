export type OutfitType =
  | "short_sleeve"
  | "long_sleeve"
  | "light_outer"
  | "outer"
  | "down";

export type OutfitView = {
  type: OutfitType;
  label: string;
  icon: string;
};
