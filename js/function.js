

$(function() {
    // すべてのページの初期化をここで1回だけ行います
    function init() {
        handleIndexPage();  // トップページ
        handlePlayPage();   // おみくじを引くページ
        handleResultPage(); // 結果ページ
        handleHistoryPage(); // 履歴ページ
    }
    init();
});

// ===== トップページの処理 =====
function handleIndexPage() {
    // bodyにindexクラスがなければ終了
    if (!$('body').hasClass('index')) return;

    // 1. 切り替えたいコメントのリスト
    const comments = [
        "こんにちは〜声優の鈴原希実です！",
        "好きな食べ物はポテト！美味しいよね〜。お店とか知ってたら教えて欲しいな〜。",
        "今日の運勢はどうかな？ドキドキするね。",
        "履歴から過去に引いたおみくじも見られるよ！",
        "のんびりしていってね〜！"
    ];

    let currentIndex = 0;
    let timerId = null;
    const changeInterval = 3000; // 3秒

    const $image = $('#myImage');     // HTMLのid="myImage"と連動
    const $balloon = $('#myBalloon'); // HTMLのid="myBalloon"と連動

    // 2. コメントを更新する関数
    function updateComment() {
        $balloon.text(comments[currentIndex]);
        currentIndex = (currentIndex + 1) % comments.length;
    }

    // 3. タイマーをスタートする関数
    function startTimer() {
        if (timerId) clearInterval(timerId);
        timerId = setInterval(updateComment, changeInterval);
    }

    // 4. 画像がタップ（クリック）されたときのイベント
    $image.on('click', function() {
        updateComment(); // 即座に次のコメントを表示
        startTimer();    // タイマーをリセット
    });

    // 5. 初期表示の実行
    updateComment();
    startTimer();
}

// ===== 演出ページ（おみくじを引くページ）の処理 =====
function handlePlayPage() {
    // bodyにplayクラスがなければ終了
    if (!$('body').hasClass('play')) return;

    let isClicked = false;
    const $track = $('.roulette-track');
    const audio = document.getElementById('stopSound');

    $('body').on('click', function() {
        if (isClicked) return;
        isClicked = true;

        // 1. 効果音を鳴らす
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("再生エラー:", e));
        }

        // 2. タップした「その瞬間」の画像のズレ位置（変形量）を正確に計算する
        const matrix = $track.css('transform');
        let currentX = 0;
        if (matrix && matrix !== 'none') {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            currentX = parseFloat(values[4]); // 現在のリアルタイムなX座標のズレ
        }

        // 3. 流れるアニメーションを解除し、現在の位置を固定する
        $track.removeClass('is-moving');
        $track.css('transform', `translateX(${currentX}px)`);

        // 4. 新しい減速アニメーションをその場で作って適用する（これで絶対に真ん中で止まる！）
        const styleSheet = document.styleSheets[0];
        // 動的にアニメーションの開始位置を現在の位置（currentX）に書き換える
        styleSheet.insertRule(`
            @keyframes dynamicStop {
                0% { transform: translateX(${currentX}px); }
                100% { transform: translateX(0px); }
            }
        `, styleSheet.cssRules.length);

        // スタイルを上書きしてじわっと中央に止める
        $track.css('animation', 'dynamicStop 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards');
        $('.tap-guide').text('判定中...');

        // おみくじ結果を裏でランダムに選択（ここは元の処理のまま）
        const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
        const lucky = settings.showLuckyItem
            ? luckyItems[Math.floor(Math.random() * luckyItems.length)]
            : null;

        const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
        history.push({ result, lucky, date: new Date().toLocaleString() });
        localStorage.setItem('omikujiHistory', JSON.stringify(history));
        localStorage.setItem('omikujiCurrent', JSON.stringify({ result, lucky }));

        // 減速して中央にピタッと止まった（1.8秒後）の、2秒後（計3.8秒後）に結果画面へ遷移
        setTimeout(function() {
            window.location.href = 'result.html';
        }, 3800); 
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
