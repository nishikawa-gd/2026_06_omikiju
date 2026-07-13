// おみくじ結果リスト
const resultPages = [
  "result.html",
  "result_2.html",
  "result_3.html"
];

const playBtn = document.getElementById("playBtn");

if (playBtn) {
  playBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const randomPage =
      resultPages[Math.floor(Math.random() * resultPages.length)];
    location.href = randomPage;
  });
}

// ラッキーアイテム
const luckyItems = ["気合いのはちまき", "キセキのタネ", "しんぴのしずく", "ゴツゴツメット", "食べ残し"];

const itemTxt = document.querySelector(".item_txt");
if (itemTxt) {
  const randomItem =
    luckyItems[Math.floor(Math.random() * luckyItems.length)];
  itemTxt.textContent = randomItem;
}


// ラッキーアイテムON/OFF
const settings = {
  showLuckyItem: true
};

