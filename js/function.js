$(function() {
    function init() {
        handleLoading(); // ローディング処理を実行
        handlePlayPage();
        handleResultPage();
        handleHistoryPage();
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