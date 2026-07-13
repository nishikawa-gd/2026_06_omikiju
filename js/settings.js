// おみくじ結果リスト
const omikujiResults = [
  { type: "大吉", text: "お釣りが777円になるかも!?記念にレシートは取っておこう!", img: "images/result/daikichi.png" },
  { type: "中吉", text: "新商品との運命の出会いあり！買わないと後悔するかも。", img: "images/result/chukichi.png" },
  { type: "小吉", text: "温かいものを食べると午後の眠気が少しだけマシになる…かも?", img: "images/result/shokichi.png" },
  { type: "凶", text: "食べたいと思った商品が売り切れている予感…", img: "images/result/kyo.png" },
  { type: "大凶", text: "レジ直前で財布を忘れたことに気付く。", img: "images/result/daikyo.png" }
];

const foods = [
  "ツナマヨおにぎり",
  "鮭おにぎり",
  "たまごサンド",
  "のり弁当",
  "ナポリタン",
  "カップ麺"
];

const drinks = [
  "緑茶",
  "カフェラテ",
  "麦茶",
  "コーラ",
  "オレンジジュース",
  "ウーロン茶"
];

const desserts = [
  "プリン",
  "クッキー",
  "チョコ",
  "シュークリーム",
  "アイス",
  "グミ"
];

const settings = {
  showLuckyItem: true
};