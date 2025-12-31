export type OutfitType =
  | "sleeveless"
  | "short_sleeve"
  | "three_quarter_sleeve"
  | "long_sleeve"
  | "mock_neck"
  | "cardigan"
  | "jacket"
  | "light_coat"
  | "wool_coat"
  | "down_jacket";

export type AccessoryType =
  | "scarf"
  | "mittens"
  | "cap"
  | "beanie"
  | "umbrella"
  | "sunglasses";

export type OutfitView = {
  type: OutfitType;
  label: string;
  icon: string;
  accessories?: AccessoryType[];
};

export const OUTFIT_MASTER: Record<OutfitType, { label: string; icon: string }> = {
  sleeveless: { label: "ノースリーブ", icon: "1_sleeveless" },
  short_sleeve: { label: "半袖", icon: "2_shortSleeve" },
  three_quarter_sleeve: { label: "七分丈", icon: "3_threeQuarterSleeve" },
  long_sleeve: { label: "長袖", icon: "4_longSleeve" },
  mock_neck: { label: "ハイネック", icon: "5_mockNeck" },
  cardigan: { label: "カーディガン", icon: "6_cardigan" },
  jacket: { label: "ジャケット", icon: "7_jacket" },
  light_coat: { label: "薄手のコート", icon: "8_coat" },
  wool_coat: { label: "ウールコート", icon: "9_woolCoat" },
  down_jacket: { label: "ダウンジャケット", icon: "10_downJacket" },
};

export const ACCESSORY_MASTER: Record<AccessoryType, { label: string; icon: string }> =
  {
    scarf: { label: "マフラー", icon: "scarf" },
    mittens: { label: "手袋", icon: "mittens" },
    cap: { label: "帽子", icon: "cap" },
    beanie: { label: "ニット帽", icon: "beanie" },
    umbrella: { label: "傘", icon: "umbrella" },
    sunglasses: { label: "サングラス", icon: "sunglasses" },
  };