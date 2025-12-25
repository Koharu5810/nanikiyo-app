# やること
- [ ] 雨・風の気温補正
- [ ] 紫外線強度定義
- [ ] 服装の複数候補化・小物追加（カーディガン⇔ジャケット / マフラー・手袋追加など）
- [ ] コメント文（「朝晩は冷えそう」など）の追加

- [ ] weatherMapper.ts で useOutfit を呼んでいる件修正（React Hooks のルール的に NG）
- [ ] outfit.description定義→Summaryで呼び出し


## 技術的負債・備忘録
- [ ] App.tsx 内の ESLint 警告を `disable-next-line` で回避中。
  - 理由：
  - 将来的に React 標準のやり方に直せるか検討。