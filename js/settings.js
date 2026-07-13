// おみくじ結果リスト
const omikujiResults = [
  { type: "大吉", text: "お釣りが777円になるかも!?記念にレシートは取っておこう!", img: "images/result/daikichi.png" },
  { type: "中吉", text: "新商品との運命の出会いあり！買わないと後悔するかも。", img: "images/result/chukichi.png" },
  { type: "小吉", text: "温かいものを食べると午後の眠気が少しだけマシになる…かも?", img: "images/result/shokichi.png" },
  { type: "凶", text: "食べたいと思った商品が売り切れている予感…", img: "images/result/kyo.png" },
  { type: "大凶", text: "レジ直前で財布を忘れたことに気付く。", img: "images/result/daikyo.png" }
];


// ラッキーアイテム
const luckyItems = [
  " ツナマヨおにぎり +  緑茶 +  プリン",
  " たまごサンド +  カフェラテ +  クッキー",
  " のり弁当 +  麦茶 +  チョコ",
  " ナポリタン +  オレンジジュース +  シュークリーム",
  " カップ麺 +  牛乳 +  アイス",
  " からあげ棒 +  鮭おにぎり +  コーラ",
  " アメリカンドッグ +  コーヒー +  ドーナツ",
  " 肉まん +  ほうじ茶 +  杏仁豆腐",
  " カレー +  ウーロン茶 +  バニラアイス",
  " ピザまん +  アップルジュース +  グミ"
];

// ラッキーアイテムON/OFF
const settings = {
  showLuckyItem: true
};
