// おみくじ結果リスト
const omikujiResults = [
  {
    type: "大吉",
    text: '<div class="mikuji-texts"><p class="mikuji-maintext">最高の一日となるでしょう。</p>物事が思いがけないほど良い方向へ進み、心躍る出来事に巡り合えそうです。笑顔を忘れずに過ごしましょう。</div>',
    img: "images/result_history/result/r_daikichi.png"
  },
  {
    type: "中吉",
    text: '<div class="mikuji-texts"><p class="mikuji-maintext">穏やかな幸運に恵まれる一日です。</p>焦らず自分らしく過ごすことで、小さな喜びや嬉しい出来事が訪れるでしょう。周りへの感謝も忘れずに。</div>',
    img: "images/result_history/result/r_chukichi.png"
  },
  {
    type: "小吉",
    text: '<div class="mikuji-texts"><p class="mikuji-maintext">少しずつ運気が上向いています。</p>身近な幸せに目を向けることで、思いがけない良いご縁や発見に巡り合えそうです。小さな一歩を大切に。</div>',
    img: "images/result_history/result/r_shokichi.png"
  },
  {
    type: "凶",
    text: '<div class="mikuji-texts"><p class="mikuji-maintext">慎重に過ごすのが良いでしょう。</p>焦らず落ち着いて行動すれば、この先の運気は少しずつ好転していきます。自分のペースで歩みましょう。</div>',
    img: "images/result_history/result/r_kyo.png"
  }
];

// ラッキーアイテム
const luckyItems = ["懐中時計", "文庫本", "便箋", "万年筆", "花", "お茶"];
const luckyColors = ["紅", "藍", "若草", "藤", "琥珀"];
const luckyFlavors = ["羊羹", "珈琲", "抹茶", "林檎", "金平糖"];
const luckyWords = ["急がば回れ", "笑う門には福来る", "一期一会", "初心忘るべからず"];

// ラッキーアイテムON/OFF
const settings = {
  showLuckyItem: true
};
