

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

	const playImages = [
		'images/result/music_0101.png',
		'images/result/music_0102.png',
		'images/result/music_0103.png',
		'images/result/music_0104.png',
		'images/result/music_0105.png',
		'images/result/music_0106.png',
		'images/result/music_0107.png'
	];

	const $sliderImage = $('#slideshow-img');
	let playSlideIndex = 0;
	const playInterval = setInterval(() => {
		playSlideIndex = (playSlideIndex + 1) % playImages.length;
		$sliderImage.attr('src', playImages[playSlideIndex]);
	}, 120);

	// show-resultボタン押下時の処理
	$('#show-result').on('click', function (e) {

		// デフォルトの動作をキャンセル
		e.preventDefault();

		clearInterval(playInterval);

		// おみくじ結果をランダムに選択		
		const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

		// 履歴保存
		const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
		const lucky = '';
		localStorage.setItem('omikujiCurrent', JSON.stringify({ result, lucky }));

		// 履歴に追加（新しいものを先頭にする）
		history.unshift({ result, date: new Date().toLocaleString() });
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
	$('#result-type').text(`${data.result.type}`);
	$('#result-text').text(`${data.result.text}`);
	$('#music-img').attr('src', data.result.img).attr('alt', data.result.type); 
	$('#artist').text(`${data.result.artist}`);
	$('#phrase01').text(`${data.result.phrase}`);
	$('#phrase02').text(`${data.result.phrases}`);

	// 結果に応じたクラスをbodyに追加	
	$('body').addClass('js-' + data.result.type);
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
				`<strong class="history-type">${item.result.type}</strong> 
				<span class="history-text">${item.result.text}</span> 
				<span class="history-date">${item.date}</span>
				<br><span class="history-artist">${item.result.artist}</span>
				<br><span class="history-phrase">${item.result.phrase}</span> 
				<span class="history-phrases">${item.result.phrases}</span>`
		);
		$list.append($li);
	});

	// 履歴削除ボタン処理
	$('#clear-history').on('click', function () {
		if (confirm('履歴をすべて削除しますか？')) {
			localStorage.removeItem('omikujiHistory');
			$list.empty();
		}
	});
}


