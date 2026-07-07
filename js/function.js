

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
	$('.show-result').on('click', function (e) {

		// デフォルトの動作をキャンセル
		e.preventDefault();

		// おみくじ結果とラッキーアイテムをランダムに選択
		const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

		// ラッキーアイテムの選択（設定がONの場合のみ）
		const lucky = settings.showLuckyItem ? {
			item: luckyItems[Math.floor(Math.random() * luckyItems.length)],
			color: luckyColors[Math.floor(Math.random() * luckyColors.length)],
			flavor: luckyFlavors[Math.floor(Math.random() * luckyFlavors.length)],
			word: luckyWords[Math.floor(Math.random() * luckyWords.length)]
		} : null;

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

	// 結果画像
	$('#r-mainimg')
		.attr('src', data.result.img)
		.attr('alt', data.result.type);

	// 結果テキスト
	$('#r-subtext').html(data.result.text);

	// 結果に応じたクラスをbodyに追加	
	$('body').addClass('js-' + data.result.type);

	// ラッキーアイテムの表示（設定がONの場合のみ）
	if (settings.showLuckyItem && data.lucky) {
		$('#lucky-item').text(data.lucky.item);
		$('#lucky-color').text(data.lucky.color);
		$('#lucky-flavor').text(data.lucky.flavor);
		$('#lucky-text').text(data.lucky.word);
	} else {
		$('.lucky-wrapper').remove();
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
	if (history.length === 0) {
		$list.html('<li class="h-empty">履歴がありません</li>');
		return;
	}

	history.forEach(item => {
		const $li = $('<li class="h-item">').html(
			`<span class="h-date">${item.date}</span>
			<div class="h-texts">
				<div class="h-typelucky">
					<span class="h-type">${item.result.type}</span>
					${item.lucky ? `<span class="h-lucky">吉物：${item.lucky.item}</span>` : ''}
				</div>
				<span class="h-text">${item.result.text}</span>
			</div>`
		);
		$list.append($li);
	});



	// 履歴削除ボタン処理
	$('#hbtn-history').on('click', function () {
		if (confirm('履歴をすべて削除しますか？')) {
			localStorage.removeItem('omikujiHistory');
			$list.empty();
		}
	});
}



// ===== ScrollRevealの処理 =====
$(function () {


	// 下からくる系
	ScrollReveal().reveal(
    '.i-btns, .play p',
    {
      reset: false,      // スクロール戻しても再実行しない!
      distance: '10px',  // 下からどれくらい動くか
      duration: 1400,     // ふわっとする長さ
      easing: 'ease-out',
      origin: 'bottom',
      opacity: 0
    });


	// その場系
	ScrollReveal().reveal(
    '.i-logo, .p-flowers, .mikujiinner, .rhbtn-item',
    {
      reset: false,      // スクロール戻しても再実行しない!
      distance: '0px',  // 下からどれくらい動くか
      duration: 800,     // ふわっとする長さ
      easing: 'ease-out',
      origin: 'bottom',
      opacity: 0
    });
});