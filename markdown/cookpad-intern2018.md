# Cookpad summer intern 2018で学んだ事柄

<p class="data">2018/09/05</p>

Cookpadのインターンは前半が講義で，後半が実践という形式になっており，素晴らしい体験ができ，またその分学びが大きいです．

この記事では，選考のことや，実際の環境などは他に譲ることにし，今回のインターンで学んだことについてまとめてみようと思います．

なお，後半は私はOJTコースでAndroid開発を行いましたので，Androidについての知識がメインになるかと思います．

## Genymotionはもう速くない
少し前には公式のエミュレータたより早いと言われていたGenymotionですが，実は最近公式のエミュレータが早くなったので，あまりスピードは変わらないようです．
それどころか，公式のエミュレータではGAppsが端からライセンス条項に則った形でインストールされているため，むしろ強そうです．

## ExoPlayer
最近（？）Googleが作った動画再生用のライブラリ．
多分最近のアプリは大抵これで動画埋め込んでる．

## Stetho
Facebookが開発してる（多分）ツールで，Androidエミュレータのネットワークのトラフィックを監視したり，ビュー階層をHTMLっぽく見渡せる．
デバッグのツールとして素晴らしい．

## テスト
Rxのテストについては，相当量のテストを書いたため，多くを学ぶことができたと言って良い．
まず，使用する変数等を初期化し，続いて，whenということで，関数の呼び出しを（Mockに対しても）行う．最後に，thenということで，関数の返り値を評価したり，関数が呼ばれたかどうかを評価したりする．
Mockを作るときには，mockitoが素晴らしいツールであることも学んだ．