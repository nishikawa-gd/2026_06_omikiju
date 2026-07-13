
// おみくじ結果


const omikujiResults = [
  {
    type: "大吉",
    text: "爆発的な幸運が訪れる日。思い切った挑戦が成功につながるでしょう。",
    img: "images/result/earth.png"
  },
  {
    type: "吉",
    text: "星のように輝ける一日。周りとの出会いを大切に。",
    img: "images/result/venus.png"
  },
  {
    type: "中吉",
    text: "星のように輝ける一日。周りとの出会いを大切に。",
    img: "images/result/jupiter.png"
  },
  {
    type: "小吉",
    text: "心と体を休めるタイミング。無理をせず、自分を労わりましょう。",
    img: "images/result/neptune.png"
  },
  {
    type: "凶",
    text: "一度立ち止まることで新しい道が見えてきます。今日は慎重に。",
    img: "images/result/solor.png"
  }

];
const planetImages = {
  earth: "images/earth.png",
  venus: "images/venus.png",
  jupiter: "images/jupiter.png",
  neptune: "images/neptune.png",
  sun: "images/solor.png"
};

// 星の名前Í
const names = {
  earth: "地球",
  venus: "金星",
  jupiter: "木星",
  neptune: "海王星",
  sun: "太陽"
};
// ラッキーアイテム
const luckyItems = ["傘", "本", "スマホ", "鍵", "花", "お茶"];

// 設定
const settings = {
  showLuckyItem: true
};