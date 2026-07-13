// ===== 1. おみくじデータの辞書（1〜30番まで用意します） =====
const omikujiData = {
	"01": { main: "即行動", sub: "今日は即断即決。迷ったら、最初に思いついた方を。" },
	"02": { main: "全集中", sub: "一日の計は朝にあり。朝一で一番面倒な仕事を終わらせ。" },
	"03": { main: "爆睡", sub: "何もしない日。スマホを置いて、ひたすら眠るべし。" },
	"04": { main: "散歩", sub: "知らない道を歩いて、小さな発見を見つけなさい。" },
	"05": { main: "デトックス", sub: "一日スマホ断ち。画面を見ず、リアルな世界感じて。" },
	"06": { main: "大食い", sub: "好きなものを好きなだけ食べる。カロリーは忘れてよ。" },
	"07": { main: "散財", sub: "欲しかったアレを買う。経済を回すのはあなたです。" },
	"08": { main: "湯治", sub: "今日はお風呂に注力。お気に入りの入浴剤で限界まで癒やされて。" },
	"09": { main: "断捨離", sub: "部屋の不要なものを３つゴミ箱へ。空間も心もスッキリ。" },
	"10": { main: "感謝", sub: "身近なあの人に「ありがとう」と唐突に送るべし。" },
	"11": { main: "冒険", sub: "入ったことのない店で昼食を。新たな扉が開く。" },
	"12": { main: "惰眠", sub: "アラームはかけない。目が覚めるまで泥のように眠れ。" },
	"13": { main: "炭水化物", sub: "ラーメンと白米。あるいはパスタとパン。ダブル炭水化物を許す。" },
	"14": { main: "音信不通", sub: "SNSのアプリを消す。（夜には戻してよし）一日のデジタル断食。" },
	"15": { main: "贅沢", sub: "コンビニで一番高いアイスを買う。一口ずつ噛み締めて。" },
	"16": { main: "丁寧", sub: "いつもより時間をかけ靴をピカピカに磨く。良い場所へ導かれる。" },
	"17": { main: "回避", sub: "気が進まない誘いは全力で断る。自分の時間を守れ。" },
	"18": { main: "筋トレ", sub: "スクワットを限界までやる。筋肉は裏切らない。" },
	"19": { main: "美化", sub: "デスクの周りを完璧に掃除する。作業効率が爆上がり。" },
	"20": { main: "密入国", sub: "普段行かない隣の駅で降りてみる。見知らぬ街を彷徨え。" },
	"21": { main: "甘やかし", sub: "今日は自分を絶対に怒らない。全てを肯定せよ。" },
	"22": { main: "夜更かし", sub: "お気に入りの映画を深夜に一本観る。夜の静寂を楽しんで。" },
	"23": { main: "連絡", sub: "最近会っていない友人にスタンプを一つだけ送ってみる。" },
	"24": { main: "鑑賞", sub: "空を見上げて雲の形を眺める。スマホは見ないこと。" },
	"25": { main: "早寝", sub: "夜の２２時には布団に入る。明日の自分が感謝する。" },
	"26": { main: "変化", sub: "いつもと違う髪型や服の色に挑戦。新しい自分に出会う。" },
	"27": { main: "懐古", sub: "昔好きだった曲をプレイリストで聴く。あの頃の熱を取り戻せ。" },
	"28": { main: "利他", sub: "コンビニの募金箱に小銭を全て入れる。陰ながら徳を積め。" },
	"29": { main: "試読", sub: "本屋へ行き、直感で選んだ一冊を買う。未知の知識を蓄えよ。" },
	"30": { main: "放浪", sub: "目的地を決めずに最初に来た電車に乗る。旅の始まりである。" },
};

$(function () {
    function init() {
        handleLoading();
        handlePlayPage();
        handleResultPage();
        handleHistoryPage(); 
    }
    init();
});

function handleLoading() {
	if (!$('body').hasClass('index')) return;

	const displayTime = 2000;

	setTimeout(function () {
		$('#loading').addClass('loaded');
	}, displayTime);
}

function handlePlayPage() {
	if (!$('body').hasClass('play-page')) return;

	const shakeDuration = 2000;

	setTimeout(function () {
		$('.omikuji-container').removeClass('is-shaking').addClass('is-flipped');

		setTimeout(function () {
			$('.play-action').fadeIn(500);
		}, 500);

	}, shakeDuration);
}


// ===== おみくじ結果をランダムに表示＆保存する処理 =====
function handleResultPage() {
	if (!$('body').hasClass('result-page')) return;

	const min = 1;
	const max = 30; // ※テスト中は用意した辞書の数（3など）に合わせておくと安心です
	const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	const kujiNumber = ("0" + randomNumber).slice(-2);
	const imagePath = 'img/kuji' + kujiNumber + '.png';

	$('#kuji-result-img').attr('src', imagePath);

	// ▼▼▼ ここから履歴保存の処理を追加 ▼▼▼

	// 現在の日時を取得（例: 2026/6/30 11:39:55）
	const now = new Date();
	const dateStr = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

	// 保存されている履歴を呼び出す（無い場合は空の配列）
	let history = JSON.parse(localStorage.getItem('omikujiHistory')) || [];

	// 新しい履歴を一番上（先頭）に追加
	history.unshift({
		date: dateStr,
		id: kujiNumber
	});

	// ブラウザに保存し直す
	localStorage.setItem('omikujiHistory', JSON.stringify(history));
}

// ===== 履歴画面の表示処理 =====
function handleHistoryPage() {
    if (!$('body').hasClass('history-page')) return;

    const $container = $('.history-list-container');
    $container.empty(); // HTMLにあるダミーデータを一旦空にする

    // 保存されている履歴を呼び出す
    let history = JSON.parse(localStorage.getItem('omikujiHistory')) || [];

    // 履歴がゼロの場合の処理
    if (history.length === 0) {
        $container.append('<p style="color:#f7e3af; text-align:center;">履歴はまだありません。</p>');
        return;
    }

    // 履歴データをもとにHTMLを組み立てる
    history.forEach(function(item) {
        // 辞書からテキストデータを引き出す
        const data = omikujiData[item.id];
        
        // データが存在する場合のみカードを作成
        if (data) {
            const cardHTML = `
                <div class="history-item">
                    <p class="history-date">${item.date}</p>
                    <div class="history-card">
                        <div class="history-main-text">${data.main}</div>
                        <div class="history-sub-text">${data.sub}</div>
                    </div>
                </div>
            `;
            $container.append(cardHTML);
        }
    });

    // ▼ おまけ：「履歴を削除」ボタンの動作 ▼
    $('.btn-delete').on('click', function(e) {
        e.preventDefault();
        if (confirm('履歴をすべて削除しますか？')) {
            localStorage.removeItem('omikujiHistory'); // データ消去
            location.reload(); // 画面を更新してリセット
        }
    });
}