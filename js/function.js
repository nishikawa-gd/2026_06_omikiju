

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

	// ===== クチバシアニメーション =====
const frames = [

   "images/play/play1.png",
	"images/play/play2.png",
    "images/play/play3.png",
    "images/play/play4.png",
	"images/play/play5.png",
    "images/play/play4.png",
    "images/play/play3.png",
    "images/play/play2.png"
];

let frame = 0;

const animationTimer = setInterval(function(){

    frame++;

    if(frame >= frames.length){
        frame = 0;
    }

    $('#beak').attr('src', frames[frame]);

},800);

	// show-resultボタン押下時の処理
	$('#show-result').on('click', function(e) {

		// デフォルトの動作をキャンセル
		e.preventDefault();

		clearInterval(animationTimer);

// 最後は閉じた状態に戻す
$('#beak').attr('src', 'images/play/play1.png');

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
	//$('#result-text').text(`${data.result.type}：${data.result.text}`);
	// 画像の設定
	$('#result-img')
  .attr('src', data.result.img)
  .attr('alt', '')
  .removeClass()
  .addClass(data.result.resultClass);
	$('#bird-img')
  .attr('src', data.result.bird)
  .removeClass()
  .addClass(data.result.birdClass);
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

    const $li = $(`
        <li class="history-card">

            <img class="history-bird"
                 src="${item.result.bird}"
                 alt="鳥">

            <img class="history-result"
                 src="${item.result.img}"
                 alt="結果">

            <div class="history-info">

                <p class="history-lucky">
                    🍀 ラッキーアイテム：${item.lucky}
                </p>

                <p class="history-date">
                    📅 ${item.date}
                </p>

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


