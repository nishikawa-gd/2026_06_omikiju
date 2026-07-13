// おみくじ結果リスト
const omikujiResults = [
  { type: "トレロン吉",
    text: "大吉枠", 
    img: "images/result/toreron-kichi.svg" },
  { type: "フランスパン吉", 
    text: "矯正には辛い", 
    img: "images/result/france-kichi.svg" },
  { type: "食パン吉", 
    text: "切り方で人間性でる", 
    img: "images/result/shokupan-kichi.svg" },
  { type: "サンドウィッチ吉", 
    text: "タマゴ派", 
    img: "images/result/sando-kichi.svg" },
  { type: "クロワッサン吉", 
    text: "サクサクが美味い", 
    img: "images/result/croissant-kichi.svg" },
  { type: "パン耳吉", 
    text: "大凶枠", 
    img: "images/result/panmimi-kichi.svg" },
  // { img: "images/result/france-kichi.svg" },
  // { img: "images/result/toreron-kichi.svg" },
  // { img: "images/result/shokupan-kichi.svg" },
  // { img: "images/result/panmimi-kichi.svg" },
  // { img: "images/result/sando-kichi.svg" },
  // { img: "images/result/croissant-kichi.svg" },
];

// // ラッキーアイテム
const luckyItems = ["傘", "本", "スマホ", "鍵", "花", "お茶"];

// ラッキーアイテムON/OFF
const settings = {
  showLuckyItem: true
};
