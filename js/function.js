

// $(function () {
// 	function init() {
// 		handlePlayPage();
// 		handleResultPage();
// 		handleHistoryPage();
// 	}
// 	init();
// });



// // ===== 演出ページの処理 =====
// function handlePlayPage() {

// 	if (!$('body').hasClass('play')) return;

// 	// show-resultボタン押下時の処理
// 	$('.planet').on('click', function (e) {
// 		// デフォルトの動作をキャンセル
// 		e.preventDefault();

// 		// 押した星
// 		const planet = $(this).data("planet");

// 		// 保存
// 		localStorage.setItem("planet", planet);

// 		// ランダム結果
// 		const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

// 		// ラッキーアイテム
// 		const lucky = settings.showLuckyItem
// 			? luckyItems[Math.floor(Math.random() * luckyItems.length)]
// 			: null;

// 		// 保存
// 		localStorage.setItem("omikujiCurrent", JSON.stringify({
// 			planet,
// 			result,
// 			lucky
// 		}));

// 		// 履歴
// 		const history = JSON.parse(localStorage.getItem("omikujiHistory") || "[]");

// 		history.push({
// 			result,
// 			lucky,
// 			date: new Date().toLocaleString()
// 		});

// 		localStorage.setItem("omikujiHistory", JSON.stringify(history));

// 		// // 遷移
// 		// window.location.href = "result.html";


// 		// // おみくじ結果とラッキーアイテムをランダムに選択
// 		// // const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

// 		// // ラッキーアイテムの選択（設定がONの場合のみ）
// 		// const lucky = settings.showLuckyItem
// 		// 	? luckyItems[Math.floor(Math.random() * luckyItems.length)]
// 		// 	: null;

// 		// // 履歴保存
// 		// const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
// 		// const planet = localStorage.getItem("planet");

// 		// // 選んだ惑星名
// 		// $("#planet-name").text(names[planet]);

// 		// 選んだ惑星画像
// 		$("#planet-img")
// 			.attr("src", planetImages[planet])
// 			.attr("alt", names[planet]);


// 		// おみくじ結果
// 		$('#result-text').text(`${result.type}：${result.text}`);

// 		// $('#result-text').text(`${data.result.type}：${data.result.text}`);


// 		// 結果画像
// 		$('#planet-img')
// 			.attr('src', planetImages[planet])
// 			.attr('alt', names[planet]);

// 		// 履歴に追加
// 		history.push({ result, lucky, date: new Date().toLocaleString() });
// 		// 履歴をlocalStorageに保存
// 		localStorage.setItem('omikujiHistory', JSON.stringify(history));

// 		// 現在結果保存
// 		localStorage.setItem("omikujiCurrent", JSON.stringify({ planet, result, lucky }));
// 		// 結果ページへ遷移
// 		window.location.href = 'result.html';

// 	});

// 	// bodyにplayクラスがなければ終了
// 	if (!$('body').hasClass('play')) return;

// }


// // ===== 結果ページの処理 =====
// function handleResultPage() {

// 	// bodyにresultクラスがなければ終了
// 	if (!$('body').hasClass('result')) return;

// 	// localStorageから現在のおみくじ結果を取得
// 	const data = JSON.parse(localStorage.getItem('omikujiCurrent'));
// 	// データがなければ終了
// 	if (!data) return;
// 	// 選んだ星
// 	// const planet = localStorage.getItem("planet");

// 	// $("#planet-name").text(names[planet]);
// 	const planet = data.planet;

// 	$("#planet-name").text(names[planet]);
// 	// 結果表示
// 	$('#result-text').text(`${data.result.type}：${data.result.text}`);
// 	// 画像の設定
// 	$('#result-img').attr('src', data.result.img).attr('alt', data.result.type);

// 	// 結果に応じたクラスをbodyに追加	
// 	$('body').addClass('js-' + data.result.type);

// 	// ラッキーアイテムの表示（設定がONの場合のみ）
// 	if (settings.showLuckyItem && data.lucky) {
// 		$('#lucky-item').text(data.lucky);
// 	} else {
// 		$('#lucky-wrapper').remove();
// 	}
// }


// // ===== 履歴ページの処理 =====
// function handleHistoryPage() {

// 	// bodyにhistoryクラスがなければ終了
// 	if (!$('body').hasClass('history')) return;

// 	// localStorageから履歴を取得
// 	const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');

// 	// 履歴がなければメッセージを表示して終了
// 	const $list = $('#history-list');

// 	history.forEach(item => {
// 		const $li = $('<li>').html(
// 			`${item.date}：<strong>${item.result.type}</strong> - ${item.result.text}` +
// 			(item.lucky ? ` (ラッキーアイテム: ${item.lucky})` : '')
// 		);
// 		$list.append($li);
// 	});

// 	// 履歴削除ボタン処理
// 	$('#clear-history').on('click', function () {
// 		if (confirm('履歴をすべて削除しますか？')) {
// 			localStorage.removeItem('omikujiHistory');
// 			$list.empty();
// 		}
// 	});
// // // // }
// $(function () {
// 	function init() {
// 		handlePlayPage();
// 		handleResultPage();
// 		handleHistoryPage();
// 	}
// 	init();
// });

// // ===== 演出ページ（星を選ぶ画面）の処理 =====
// function handlePlayPage() {
// 	if (!$('body').hasClass('play')) return;

// 	$('.planet').on('click', function (e) {
// 		e.preventDefault();

// 		// 1. 押した星のIDを取得（例: "earth"）
// 		const planet = $(this).data("planet") || "earth"; // 万が一空っぽならearthにする

// 		// 2. 選んだ星に対応するおみくじ結果を取得
// 		const result = omikujiResults[planet] || omikujiResults["earth"];

// 		// ラッキーアイテム
// 		const lucky = settings.showLuckyItem
// 			? luckyItems[Math.floor(Math.random() * luckyItems.length)]
// 			: null;

// 		// 3. 現在の結果データを保存
// 		localStorage.setItem("omikujiCurrent", JSON.stringify({
// 			planet,
// 			result,
// 			lucky
// 		}));

// 		// 4. 履歴の保存（今日の日付で新しく追加）
// 		const history = JSON.parse(localStorage.getItem("omikujiHistory") || "[]");
// 		history.push({
// 			result,
// 			lucky,
// 			date: new Date().toLocaleString('ja-JP') // 今日の日付・時間を取得
// 		});
// 		localStorage.setItem("omikujiHistory", JSON.stringify(history));

// 		// 5. 結果ページへ画面遷移
// 		window.location.href = "result.html";
// 	});
// }

// // ===== 結果ページの処理 =====
// function handleResultPage() {
// 	if (!$('body').hasClass('result')) return;

// 	const data = JSON.parse(localStorage.getItem('omikujiCurrent'));
// 	// 安全装置：データがないか、壊れていたら処理を中断
// 	if (!data || !data.result) return;

// 	const planet = data.planet;

// 	// 各要素にデータを流し込む
// 	const names = { earth: "地球", venus: "金星", jupiter: "木星", neptune: "海王星", sun: "太陽", solar: "太陽" };
// 	$("#planet-name").text(names[planet] || "地球");
// 	$('#result-text').text(`${data.result.type}：${data.result.text}`);
// 	$('#result-img').attr('src', data.result.img).attr('alt', data.result.type);

// 	$('body').addClass('js-' + data.result.type);

// 	if (settings.showLuckyItem && data.lucky) {
// 		$('#lucky-item').text(data.lucky);
// 	} else {
// 		$('#lucky-wrapper').remove();
// 	}
// }

// // ===== 履歴ページの処理 =====
// function handleHistoryPage() {
// 	if (!$('body').hasClass('history')) return;

// 	const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
// 	const $list = $('#history-list');
// 	$list.empty(); // 念のため一度空にする

// 	history.forEach(item => {
// 		// 安全装置：データが壊れている履歴はスキップ
// 		if (!item || !item.result) return;

// 		history.reverse().forEach(item => {
// 			// （中身の処理）
// 			if (!item || !item.result) return;

// 			// 秒数をカットして「2026/7/14 0:01」の形にし、説明文をカットします
// 			const shortDate = item.date.replace(/:\d{2}$/, '');

// 			const $li = $('<li>').html(
// 				`${shortDate} ： <strong>【${item.result.type}】</strong>` +
// 				(item.lucky ? ` （ラッキーアイテム: ${item.lucky}）` : '')
// 			);
// 			$list.append($li);
// 		});


// 		const $li = $('<li>').html(
// 			`${item.date}：<strong>${item.result.type}</strong> - ${item.result.text}` +
// 			(item.lucky ? ` (ラッキーアイテム: ${item.lucky})` : '')
// 		);
// 		$list.append($li);
// 	});

// 	// 履歴削除ボタン処理
// 	$('#clear-history').off('click').on('click', function () {
// 		if (confirm('履歴をすべて削除しますか？')) {
// 			localStorage.removeItem('omikujiHistory');
// 			$list.empty();
// 			alert('履歴を削除しました');
// 		}
// 	});
// }

$(function () {
	function init() {
		handlePlayPage();
		handleResultPage();
		handleHistoryPage();
	}
	init();
});

// ===== 演出ページ（星を選ぶ画面）の処理 =====
function handlePlayPage() {
	if (!$('body').hasClass('play')) return;

	$('.planet').on('click', function (e) {
		e.preventDefault();

		// 1. 押した星のIDを取得（例: "earth"）
		const planet = $(this).data("planet") || "earth";

		// 2. 選んだ星に対応するおみくじ結果を取得
		const result = omikujiResults[planet] || omikujiResults["earth"];

		// ラッキーアイテム
		const lucky = settings.showLuckyItem
			? luckyItems[Math.floor(Math.random() * luckyItems.length)]
			: null;

		// 3. 現在の結果データを保存
		localStorage.setItem("omikujiCurrent", JSON.stringify({
			planet,
			result,
			lucky
		}));

		// 4. 履歴の保存（今日の日付で新しく追加）
		const history = JSON.parse(localStorage.getItem("omikujiHistory") || "[]");
		history.push({
			result,
			lucky,
			date: new Date().toLocaleString('ja-JP')
		});
		localStorage.setItem("omikujiHistory", JSON.stringify(history));

		// 5. 結果ページへ画面遷移
		window.location.href = "result.html";

		$('body').addClass('is-dark'); /* bodyを真っ黒にする（CSSが動く） */

		// 0.8秒（画面が完全に暗くなる頃）待ってから次のページへジャンプ
		setTimeout(function () {
			window.location.href = "result.html";
		}, 800);
	});
	
}

// ===== 結果ページの処理 =====
function handleResultPage() {
	if (!$('body').hasClass('result')) return;

	const data = JSON.parse(localStorage.getItem('omikujiCurrent'));
	// 安全装置：データがないか、壊れていたら処理を中断
	if (!data || !data.result) return;

	const planet = data.planet;

	// 各要素にデータを流し込む
	const names = { earth: "地球", venus: "金星", jupiter: "木星", neptune: "海王星", sun: "太陽", solar: "太陽" };
	$("#planet-name").text(names[planet] || "地球");
	$('#result-text').text(`${data.result.type}：${data.result.text}`);
	$('#result-img').attr('src', data.result.img).attr('alt', data.result.type);

	$('body').addClass('js-' + data.result.type);

	if (settings.showLuckyItem && data.lucky) {
		$('#lucky-item').text(data.lucky);
	} else {
		$('#lucky-wrapper').remove();
	}
}

// ===== 履歴ページの処理 =====
function handleHistoryPage() {
	if (!$('body').hasClass('history')) return;

	const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
	const $list = $('#history-list');
	$list.empty(); // 念のため一度空にする

	// ★【修正ポイント】重複を消し、綺麗に1つのリバースループにまとめました
	history.reverse().forEach(item => {
		if (!item || !item.result) return;

		// 秒数をカットして「2026/7/14 0:01」の形にする
		const shortDate = item.date.replace(/:\d{2}$/, '');

		// 短くスッキリした1行のHTMLを組み立てる
		const $li = $('<li>').html(
			`${shortDate} ： <strong>【${item.result.type}】</strong>` +
			(item.lucky ? ` （ラッキーアイテム: ${item.lucky}）` : '')
		);
		$list.append($li);
	});

	// 履歴削除ボタン処理
	$('#clear-history').off('click').on('click', function () {
		if (confirm('履歴をすべて削除しますか？')) {
			localStorage.removeItem('omikujiHistory');
			$list.empty();
			alert('履歴を削除しました');
		}
	});

}

