# Dive Into Mixiに行ってきました．（2）

<p class="date">2018/07/06</p>

## ドローンを飛ばす
BLEというものを使ってドローンをスマホで操作しているらしい．

→それなら，BLEを自分で喋ってドローンをもっと細かく操作すれば良い！w

BLEパケットを見ながらどの操作にどのようなUUIDが割り振られているかを割り出して操作するということらしい．すざまじい技術力だ・・・

## プログラミングコンテスト攻略のためのデータ分析入門
プログラミングコンテストを分析する（？）

Codeforcesについての分析（ロシアのサービス，不安定で良くサーバーが落ちる）
今夜，Microsoftのコンテストがあるらしい．

APIからコンテストのデータを集計できる．

効率的にやるには，必要なデータを必要なときに持ってくる必要がある．

AWSのAthenaを使う．Amazon S3にあるデータに対してSQLを使用できる．

全部データをとったらしい．2500万件のデータで，6ドル．安め？

### コンテストの成績が上がらない問題．
機械学習を使って，自分にぴったりな問題を探す！

西東社の情報から自分のレベルにあったものを探すといった思考プロセスの模様

## ルンバとフロントエンドとIoT
スマホゲームアプリの公式サイトの運用担当者

ファイトリーグ:将棋に似てる12マスのバトルゲーム

この公式サイトも，Vueとかを使って，モダンな環境で作業．

### ストライクショット！と叫ぶとルンバが動く最高のUX．
* ルンバ
* iPhone，Apple Watch
* ラズベリーパイ
* Elgato Eve
* Node
* Homebridge
* Homebridge-roomba（自作プラグインとのこと．（umesan））

### 家庭内IoTのススメ
仕事で使っている技術領域とは違った技術領域！

新たな技術が身につき，思いもよらない着想が生まれる！

## 新卒がモンストとファイトリーグで行ったこと．
どんな仕事しているのか，簡単に説明する！

### 大学時代
ベンチャー企業でUnityの開発景観（これがかなり良かったらしい）

ほかの言語などはそこまで詳しくはないらしい

### ファイトリーグ
クライアントサイド

* スキル
* インゲーム
* アウトゲーム
* ツール回収
* バグ修正，最適化

一通りやりたいと言ったら順番にやらせてくれた！

まずはバグ修正から．
* 簡単なものを含めて7つほどのバグ修正

スキル実装
* Elixirはやったことなかったが，本を見ながらやればできるようにいろいろ作ってあったらしい．
* テストも書いた

アウトゲーム
* デザイナーと企画に詳細を確認！
    * 素材，キャンセル時の挙動など．
* Unityの性質上，同時作業ができない！（まじか）難しかったらしい．

エディタ拡張
* エゲクタの方向けの機能を作る！
* コストと要望を話し合って実装！

最適化
* 合間にCPU負荷見てたり
* Issue化されたたものを対応（他の人が忙しくて手が回ってないところをやっていくみたいな感じ）

### 整備された開発環境
Lintとか自動化とかちゃんと入ってるのでやりやすい！

### 経験
開発スピード早い！

コードレビューもしっかりしていて素晴らしい！

### モンスト
* ギミック
    * SS
    * 友情コンボ
    * インゲーム全般
* UI
    * 配置
    * ロジックも
* システム
    * ネイティブ通信
    * SDK
    * その他諸々

一通りやらせてくださいと言ったらやらせてくれた！

軽めのSS開発から
* モンストのコードが読みづらい
* C++知らなくてもまぁかける！

#### コーディングだけじゃない
デザイナさんへの演出確認

コミュニケーションスキルは超重要！

以下に自分から動けるか！（デザイナは忙しい！）

### まとめ
モンストの知識はやっぱり必要！

開発が割とは早かった！

## Emacs小指に足で対応した話！
minimoの人，Perl．

Emacsおじさん

プロダクトのコードにEmacs Lispを使うレベル！

### 小指でCtrlキーを押しまくるので小指が死ぬ
それなら足で対応すればいいじゃないか！

プルダウン抵抗（回路のデザインパターン）
スイッチの判定をするためにVとGNDの間に抵抗を入れる

このスイッチのところのにフットペダルを入れた．

ArduinoにUSB UHDを喋らせれば，パソコンはこいつをキーボードだと思ってくれる．
