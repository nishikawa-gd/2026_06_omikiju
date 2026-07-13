// おみくじ結果（星のIDと紐づく正しい形式に直しました）
const omikujiResults = {
  earth: {
    type: "大吉",
    text: "爆発的な幸運が訪れる日。思い切った挑戦が成功につながるでしょう。",
    img: "images/result/earth.png"
  },
  venus: {
    type: "吉",
    text: "星のように輝ける一日。周りとの出会いを大切に。",
    img: "images/result/venus.png"
  },
  jupiter: {
    type: "中吉",
    text: "星のように輝ける一日。周りとの出会いを大切に。",
    img: "images/result/jupiter.png"
  },
  neptune: {
    type: "小吉",
    text: "心と体を休めるタイミング。無理をせず、自分を労わりましょう。",
    img: "images/result/neptune.png"
  },
  sun: {
    type: "凶",
    text: "一度立ち止まることで新しい道が見えてきます。今日は慎重に。",
    img: "images/result/solor.png"
  }
};

// 星の名前
const names = {
  earth: "地球",
  venus: "金星",
  jupiter: "木星",
  neptune: "海王星",
  sun: "太陽"
};

// ラッキーアイテム（あなたの選んだ可愛いアイテムたち！）
const luckyItems = ["お気に入りのノート", "青いハンカチ", "イヤホン", "温かい飲み物", "腕時計"];

// 設定
const settings = {
  showLuckyItem: true
};
