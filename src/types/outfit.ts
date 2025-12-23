export type OutfitType =
  | "sleeveless"
  | "short_sleeve"
  | "three_quarter_sleeve"
  | "long_sleeve"
  | "cardigan"
  | "mock_neck"
  | "jacket"
  | "duffle_coat"
  | "coat"
  | "down_jacket";

export type OutfitView = {
  type: OutfitType;
  label: string;
  icon: string;
};

export const OUTFIT_MASTER: Record<OutfitType, { label: string; icon: string }> = {
  sleeveless: { label: "ノースリーブ", icon: "1_sleeveless" },
  short_sleeve: { label: "半袖", icon: "2_shortSleeve" },
  three_quarter_sleeve: { label: "七分丈", icon: "3_threeQuarterSleeve" },
  long_sleeve: { label: "長袖", icon: "4_longSleeve" },
  cardigan: { label: "カーディガン", icon: "5_cardigan" },
  mock_neck: { label: "ハイネック", icon: "6_mockNeck" },
  jacket: { label: "ジャケット", icon: "7_jacket" },
  duffle_coat: { label: "薄手のコート", icon: "8_duffleCoat" },
  coat: { label: "コート", icon: "9_coat" },
  down_jacket: { label: "ダウンジャケット", icon: "10_downJacket" },
};