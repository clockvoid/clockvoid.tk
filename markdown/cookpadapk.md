# Cookpad.apk #2に行ってきました

## 児山さん
OSバージョンや端末固有の動作の違いは最近では少なくなってきた．
→基本的にはカメラなどのハードウェアに依存する部分に動作の違いが生まれやすい．

### Androidアプリを開発できるとは？
* アーキテクチャ
* テスト
* ドキュメント
    * Issueへのコメントなどでも良い．
* ライフサイクルをきっちり理解する

### 知っておくべきこと
デザインリソースはKyashの記事がとても良い

## Android Things Overview
最近はCookpad Martの冷蔵庫のセンサとかを作ってる人．

### Android Thingsとは
2016年リリース，2018年バージョン1.0

この間（先週の月曜日）に，Googleがいろいろ変わると急に言い出した．

100デバイスまでのお金儲けいないプロダクトのみで使えるように変わった．もう何も残ってない

プロダクションプラットフォームがすべて死んだ

NXP Pico:Android Thingsのスターターキット．Google IOで配布．

### Android Thingsで低温調理機を作る
スロークッカーに温度計をつけて，温度が上がり過ぎたらOFF，下がり過ぎたらON．

Googleがいくつかのセンサのドライバを用意．SensorEventListenerを実装．

スマートプラグ:Webhookを叩くだけでON/OFFできる


## CookpadTVのマルチモジュール
マルチモジュール化の理由:FireTVの開発を加速させたかったから

### FireTV
中身はほぼAndroid

Fire App Builderというフレームワークを使用して開発する．
→これが辛い．認証，通信など，共通化できる部分を再実装にしないと行けない．

しかもフレームワーク側でクラッシュしたりする．まじで糞

共通化したいところを共通化するなど，マルチモジュールでやれば良い．

### やったこと
共有化するモジュールとして，commonモジュールを作り，共通化するものをそこに全部打ち込んだ構成．

新しく実装するものはとりあえずどちらかで作り，両方で欲しくなったら移動．

大きい機能単位で移動できるものは移動．

commonの名前，悪い問題:なんでも使いそうで気持ち悪い
→では，coreにしよう

### まとめ
マルチモジュール化の利点としてのビルド高速化などは意識しないでやらないとどうも変わらないらしい．

## 加藤さん:Espresso Driverを用いたAppiumテスト
### Appium in Androidについて
モバイル端末向け自動テストツール．

NodeJSによるHTTPサーバ．これを使ってUIを自動的に操作してテストする！

Androidだけではなく，iOS，Webにも対応．

UIAutomater
→UIテスティングフレームワーク．アプリを外から見られるようになってる．

UIAutomater Driver:ApiumのAndroid標準のドライバ
→UI Automater ServerのAPKをインストールすると，サーバがそのアプリにアクセスして，テスト対象のAPKを自動的にテストする．

#### 良いこと
テスト対象以外のアプリに対しても操作が可能

なんとResource IDを使って操作も可能

#### 悪い点
ネットワークによるボトルネック（遅い）

### Espresso
UIAutomaterを使ってた部分をEspressoに置き換える．

EspressoをAppiumのドライバとして使用する．

#### いいこと
Contextにアクセスできる．

IdlingResourceによるまちが不要→ボトルネックがない

UIAutomaterと同じようにブラックボックスt機にテストできる

#### 悪いこと
アプリをまたいで操作できない

Debugビルドのみ対応

### 実際どうなの？
シナリオの簡素化

既存のView探索以外の手法も取れる

乗り換えは簡単！・・・ではない？
→サーバにRubyを使っているとキツい（appium_lib）が辛い→appium_lib_coreを使用する

## Dynamic Feature Moduleの基本
Android App Bundleの機能の一つ．

アプリインストール語に特定のモジュールをあとからダウンロードできるようにする

まだBeta．製品版に導入する場合にはBeta Programに登録する必要がある．

### 始め方
New Moduleで選ぶ

Enable on-demand:動的配信をするか

Fusing:4.4以下で使うか

モジュール名:ユーザから見える

### 中身
AndroidMnifestの中のdist:moduleでさっき設定したものが再設定できる．

### モジュールの依存関係
普通は，appから各モジュールを参照する．

DFMの場合は，逆で，各モジュールがappを参照する

### Dynamic Delivery
ダウンロード確認ダイアログなどは自分で出さないと勝手には出ない

ダウンロードしてアクセスするには，SplitCompatなるものを使う

### テストがしづらい
モジュールのダウンロードはPlauConsoleの内部テストを使うしかない

DIは工夫が必要．dagger.androidは使わないほうがいい？

coreモジュールをappとは別に作って依存させたほうが楽．

### bundletool
AABからAPKを作ることができる

### まとめ
DataBindingとかProguardなど，バグが残っている・・・

## Kotlin Multiplatform Library
ExpectとActualという，抽象化技術が良い

MPPに対応してるライブラリを使わないと行けない

AndroidのJunit testを実行するとうまく行かない→IDE設定を変える

### CI難しい
