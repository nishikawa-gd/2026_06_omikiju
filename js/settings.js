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
    const randomPage = resultPages[Math.floor(Math.random() * resultPages.length)];
    location.href = randomPage;
  });
}

// ラッキーアイテム
const luckyItems = ["気合いのはちまき", "キセキのタネ", "しんぴのしずく", "ゴツゴツメット", "食べ残し"];
const itemTxt = document.querySelector(".item_txt");

// リザルト画面での処理（アイテム決定と履歴の保存）
if (itemTxt) {
  const randomItem = luckyItems[Math.floor(Math.random() * luckyItems.length)];
  itemTxt.textContent = randomItem;
  
  // ★追加：結果が出たら履歴を保存する
  saveHistory(randomItem);
}

// ----------------------------------------
// 追加機能：履歴の保存と表示
// ----------------------------------------

// 1. 履歴をローカルストレージに保存する関数
function saveHistory(item) {
  // 既存の履歴を取得（なければ空の配列を用意）
  let history = JSON.parse(localStorage.getItem("omikujiHistory")) || [];
  
  // 現在のページ名を取得 (例: "result.html")
  const currentPage = window.location.pathname.split("/").pop();

  // 今回の結果データを作成
  const resultData = {
    date: new Date().toLocaleString(), // 引いた日時
    page: currentPage,                 // 結果ページ
    luckyItem: item                    // ラッキーアイテム
  };
  
  // 履歴の先頭に追加
  history.unshift(resultData);
  
  // 履歴が10件を超えたら古いものを削除（任意）
  if (history.length > 10) {
    history.pop();
  }
  
  // ローカルストレージに保存（文字列に変換して保存）
  localStorage.setItem("omikujiHistory", JSON.stringify(history));
}

// 2. 履歴を画面に表示する関数
function displayHistory() {
  // HTML側に <ul id="historyList"></ul> のような要素が必要
  const historyContainer = document.getElementById("historyList");
  
  // 表示用の要素がなければ何もしない
  if (!historyContainer) return;

  // ローカルストレージから履歴を取得
  const history = JSON.parse(localStorage.getItem("omikujiHistory")) || [];
  
  if (history.length === 0) {
    historyContainer.innerHTML = "<li>履歴はまだありません。</li>";
    return;
  }

  // 履歴をリストとして表示
  historyContainer.innerHTML = history.map(data => {
    return `<li>${data.date} - ページ: ${data.page} / ラッキーアイテム: ${data.luckyItem}</li>`;
  }).join("");
}

// 履歴表示要素があれば実行されるように呼び出し
displayHistory();