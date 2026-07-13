// ========================================
// おみくじを引くページ（トップ）での処理
// ========================================
const resultPages = [
  "result.html",
  "result_2.html",
  "result_3.html"
];

const playBtn = document.getElementById("playBtn");

if (playBtn) {
  playBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const randomPage = resultPages[Math.floor(Math.random() * resultPages.length)];
    location.href = randomPage;
  });
}

// ========================================
// 結果ページでの処理
// ========================================
const luckyItems = ["気合いのはちまき", "キセキのタネ", "しんぴのしずく", "ゴツゴツメット", "食べ残し"];
const itemTxt = document.querySelector(".item_txt");

// ★追加：HTMLの <h1 class="name"> からポケモンの名前を取得するための準備
const pokemonNameEl = document.querySelector(".name");

if (itemTxt && pokemonNameEl) {
  const randomItem = luckyItems[Math.floor(Math.random() * luckyItems.length)];
  itemTxt.textContent = randomItem;

  // ★追加：タグの中から「ヒトカゲ」などのテキストを取得
  const drawnName = pokemonNameEl.textContent;

  // ★修正：引いたポケモンの名前とアイテムの両方を保存処理に渡す
  saveHistory(drawnName, randomItem);
}


// ----------------------------------------
// 履歴の保存と表示の関数
// ----------------------------------------

// ★修正：(name, item) の2つを受け取るように変更
function saveHistory(name, item) {
  let history = JSON.parse(localStorage.getItem("omikujiHistory")) || [];

  const resultData = {
    date: new Date().toLocaleString(), // 引いた日時
    name: name,                        // ★引いたポケモンの名前
    luckyItem: item                    // ラッキーアイテム
  };

  history.unshift(resultData);

  if (history.length > 10) {
    history.pop();
  }

  localStorage.setItem("omikujiHistory", JSON.stringify(history));
}

function displayHistory() {
  const historyContainer = document.getElementById("historyList");
  if (!historyContainer) return;

  const history = JSON.parse(localStorage.getItem("omikujiHistory")) || [];

  if (history.length === 0) {
    historyContainer.innerHTML = "<li>履歴はまだありません。</li>";
    return;
  }

  // ★修正：画面の表示をポケモンの名前に合わせる
  historyContainer.innerHTML = history.map(data => {
    return `
    <li class="history_item">
      <span class="history_date">${data.date}</span>
      <span class="history_name">${data.name}</span>
      <span class="history_lucky">
        <span class="lucky_label">ラッキーアイテム:</span>
        <span class="lucky_val">${data.luckyItem}</span>
      </span>
    </li>
  `;
  }).join("");
}

displayHistory();


// ----------------------------------------
// 履歴削除ボタンの処理
// ----------------------------------------
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", function () {
    const isConfirm = confirm("これまでのデータが全て消えてしまいます。本当に削除しますか？");
    if (isConfirm) {
      localStorage.removeItem("omikujiHistory");
      displayHistory();
    }
  });
}