

$(function() {
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
	$('#show-result').on('click', function(e) {

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
function handleHistoryPage() {

	// bodyにhistoryクラスがなければ終了
	if (!$('body').hasClass('history')) return;

	// localStorageから履歴を取得
	const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');

	// 履歴がなければメッセージを表示して終了
	const $list = $('#history-list');

	history.forEach(item => {
		const $li = $('<li>').html(
			`${item.date}：<strong>${item.result.type}</strong> - ${item.result.text}` +
			(item.lucky ? ` (ラッキーアイテム: ${item.lucky})` : '')
		);
		$list.append($li);
	});
	
	// 履歴削除ボタン処理
	$('#clear-history').on('click', function() {
		if (confirm('履歴をすべて削除しますか？')) {
			localStorage.removeItem('omikujiHistory');
			$list.empty();
		}
	});
}


