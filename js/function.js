

$(function () {
	function init() {
		handlePlayPage();
		handleResultPage();
		handleHistoryPage();
	}
	init();
});



// ===== 演出ページの処理 =====
function handlePlayPage() {


	// bodyにplayクラスがなければ終了
	if (!$('body').hasClass('play')) return;

	// show-resultボタン押下時の処理
	$('#show-result').on('click', function (e) {

		// デフォルトの動作をキャンセル
		e.preventDefault();

		// おみくじ結果とラッキーアイテムをランダムに選択
		const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

		// ラッキーアイテムの選択（設定がONの場合のみ）
		const lucky = settings.showLuckyItem
			? luckyItems[Math.floor(Math.random() * luckyItems.length)]
			: null;

		// 履歴保存
		const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');

		// 履歴に追加
		history.push({ result, lucky, date: new Date().toLocaleString() });
		// 履歴をlocalStorageに保存
		localStorage.setItem('omikujiHistory', JSON.stringify(history));

		// 現在結果保存
		localStorage.setItem('omikujiCurrent', JSON.stringify({ result, lucky }));

		// 結果ページへ遷移
		window.location.href = 'result.html';
	});
}


// ===== 結果ページの処理 =====
function handleResultPage() {

	// bodyにresultクラスがなければ終了
	if (!$('body').hasClass('result')) return;

	// localStorageから現在のおみくじ結果を取得
	const data = JSON.parse(localStorage.getItem('omikujiCurrent'));
	// データがなければ終了
	if (!data) return;

	// 結果表示
	$('#result-text').text(`${data.result.type}：${data.result.text}`);
	// 画像の設定
	$('#result-img').attr('src', data.result.img).attr('alt', data.result.type);

	// 結果に応じたクラスをbodyに追加	
	$('body').addClass('js-' + data.result.type);

	// ラッキーアイテムの表示（設定がONの場合のみ）
	if (settings.showLuckyItem && data.lucky) {
		$('#lucky-item').text(data.lucky);
	} else {
		$('#lucky-wrapper').remove();
	}
}


// ===== 履歴ページの処理 =====
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

if (clearHistoryBtn) {
	clearHistoryBtn.addEventListener("click", function () {
		// 1. 確認メッセージを出す（誤操作防止のため。不要なら削除してOKです）
		const isConfirm = confirm("これまでのセーブデータが全て消えてしまいます。本当に削除しますか？");

		if (isConfirm) {
			// 2. ローカルストレージから 'omikujiHistory' というキーのデータを削除
			localStorage.removeItem("omikujiHistory");

			// 3. 画面の表示を更新（履歴なしのメッセージに切り替える）
			displayHistory();
		}
	});
}





