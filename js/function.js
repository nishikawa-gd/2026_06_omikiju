$(function() {
    function init() {
        handleLoading();
        handlePlayPage();
        handleResultPage(); // 【追加】これを呼び出す
    }
    init();
});

// ===== 自動フェードアウトするローディングの処理 =====
function handleLoading() {
    if (!$('body').hasClass('index')) return;

    // 表示させておく時間（2000ミリ秒 ＝ 2秒）
    const displayTime = 2000;

    setTimeout(function() {
        // 2秒後に loaded クラスをつけてフェードアウト
        $('#loading').addClass('loaded');
    }, displayTime);
}

// ===== おみくじフリフリ演出のコントロール =====
function handlePlayPage() {
    if (!$('body').hasClass('play-page')) return;

    // 1. フリフリさせる時間（2000ミリ秒 ＝ 2秒間）
    const shakeDuration = 2000;

    setTimeout(function() {
        // 2秒経ったらフリフリクラスを消して、下を向くクラスをつける
        $('.omikuji-container').removeClass('is-shaking').addClass('is-flipped');
        
        // 2. 下を向くアニメーション（0.6秒）が終わる頃に「結果を見る」ボタンを出現させる
        setTimeout(function() {
            $('.play-action').fadeIn(500);
        }, 500);

    }, shakeDuration);
}

// 画面が読み込まれたら自動的に実行する
$(document).ready(function() {
    // 実行中ページが結果画面（result-page）の時だけ動かす
    if ($('body').hasClass('result-page')) {
        
        // 1. 1〜30までのランダムな整数を生成
        const min = 1;
        const max = 30;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        // 2. 数字を頭に0がついた2桁の文字列に変換（例: 5 -> "05"）
        const kujiNumber = ("0" + randomNumber).slice(-2);

        // 3. 画像のパスを組み立てる (例: img/kuji05.png)
        const imagePath = 'img/kuji' + kujiNumber + '.png';

        // 4. HTMLの <img> タグにランダムなパスを上書きして表示
        $('#kuji-result-img').attr('src', imagePath);
        
        // 【確認用】デベロッパーツールに選ばれた番号を表示
        console.log("今日のおみくじ結果: " + imagePath);
    }
});