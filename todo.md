# やること
- [ ] 雨・風の気温補正
- [ ] 紫外線強度定義
- [ ] 服装の複数候補化・小物追加（カーディガン⇔ジャケット / マフラー・手袋追加など）
- [ ] コメント文（「朝晩は冷えそう」など）の追加
- [ ] outfit.description定義→Summaryで呼び出し

- [ ] weatherMapper.ts で useOutfit を呼んでいる件修正（React Hooks のルール的に NG）
- [ ] mainクラスの謎のズレ


## 技術的負債・備忘録
- [ ] App.tsx 内の ESLint 警告を `disable-next-line` で回避中。
  - 理由：
  - 将来的にReact標準のやり方に直せるか検討。