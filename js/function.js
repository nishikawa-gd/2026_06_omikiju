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

	// 5秒後に結果を見るボタン表示
	setTimeout(function(){
		$('#show-result').addClass('show');
	},5000);

	// 結果を見るボタン
	$('#show-result').on('click', function(e) {
		// aタグの移動を止める
		e.preventDefault();
		// 運勢をランダム選択
		const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
		// 惑星をランダム選択
		const planet = planets[Math.floor(Math.random() * planets.length)];
		// 運勢×惑星のメッセージ取得
		const message = messages[fortune][planet.name];
		// 結果データ作成
		const result = {
			type: fortune,
			planet: planet.name,
			text: message,
			img: planet.image,
			advice: planet.advice,
			color: planet.color
		};
		// ラッキーアイテム
		const lucky = settings.showLuckyItem
			? luckyItems[Math.floor(Math.random() * luckyItems.length)]
			: null;
		// 履歴取得
		const history = JSON.parse(
			localStorage.getItem('omikujiHistory') || '[]'
		);
		// 履歴追加
		history.unshift({
			result,
			lucky,
			date: new Date().toLocaleString()
		});
		// 保存
		localStorage.setItem(
			'omikujiHistory',
			JSON.stringify(history)
		);
		// 現在の結果保存
		localStorage.setItem(
			'omikujiCurrent',
			JSON.stringify({ result, lucky })
		);
		// 結果ページへ移動
		window.location.href = 'result.html';
	});
}

// ===== 結果ページの処理 =====
function handleResultPage() {

	// bodyにresultクラスがなければ終了
	if (!$('body').hasClass('result')) return;

	// 保存した結果を取得
	const data = JSON.parse(
		localStorage.getItem('omikujiCurrent')
	);

	if (!data) return;

	// 運勢表示
	$('.fortune').text(data.result.type);

	// 惑星名表示
	$('#planet_name').text(data.result.planet);

	// メッセージ表示
	$('.planet_sentence').text(data.result.text);

	// 惑星画像表示
	$('.planet_img').attr(
		'src',
		data.result.img
	);

	// ラッキーアイテム表示
	if (data.lucky) {
		$('.lucky_sentence').text(data.lucky);
	}

	// アドバイス表示
	$('.advice_sentence').text(data.result.advice);

	// ラッキーカラー表示
	$('.color_sentence').text(data.result.color);
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

	const $li = $(`
	<li class="history_item">
		<p class="history_date">
			${item.date}
		</p>
		<div class="history_card">
			<div class="history_planet">
				<img src="${item.result.img}">
			</div>
			<div class="history_content">
				<div class="history_top">
					<span class="history_fortune">
						${item.result.type}
					</span>
					<span class="history_name">
						${item.result.planet}
					</span>
					<p>
						${item.result.text}
					</p>
				</div>
				<div class="history_bottom">
					<p>
						今日のアドバイス…
						<strong>${item.result.advice}</strong>
					</p>
					<p>
						ラッキーカラー…
						<strong>${item.result.color}</strong>
					</p>
				</div>
			</div>
		</div>
	</li>
	`);
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
