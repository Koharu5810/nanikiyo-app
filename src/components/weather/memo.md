🧱 ページ・構造系
🧩 表示パーツ（中身）
🧭 レイアウト専用

components/weather/
├─ 🧱Page.tsx              ← ページ（画面の入口）
│
├─ 🧱List.tsx              ← 複数日分を並べるリスト
│
├─ 🧱Card.tsx              ← 1日分のカード（司令塔）
│   │
│   ├─ 🧩Today.tsx         ← 今日の中身（情報多い）
│   ├─ 🧩Near.tsx          ← 明日・明後日の中身
│   └─ 🧩Far.tsx           ← 4日目以降の中身
│
├─ 🧩WeatherSummary.tsx    ← 気温・降水など数値まとめ
└─ 🧩OutfitSummary.tsx     ← 服アイコン＋ラベル


🔁 データの流れ
DailyWeatherView（1日分のデータ）
        ↓
WeatherOutfitCard
  └ Today / Near / Far（variantで分岐）
        ├ WeatherSummary（天気予報数値）
        └ OutfitSummary（服）
