# Shibuya Apk #25に行ってきた話

<p class="date">2018-05-25</p>

Shibuya.apk#25 Google IO報告会に行ってきましたので，それについてまとめます．

今日は森タワーを簡単に見つけることができました😊

今日だけShibuya.aab（Android App Bundle）という名前になったようです．

## 一人目:Slices 氏
ざっくりとSlicesとは，検索結果の中に自分のアプリのアクションを表示することができる機能．
将来的には，通知とか，ウィジェットとかにも出せるようになるっぽい．

簡単なテンプレートはいくつか存在する
まだユーザエンドには降りてないが，開発はできる．
→どのようにして確認するかというと，Slice-Viewerを使えばOK

### SliceManager
Host側がSliceManager，Provider側が作るアプリ（Host側のアプリも作れるらしい）

SliceProviderクラスを実装する．
あとは，Builderパターンでタイトルなどを設定できる．SliceActionでウィジェットとかと同じように，自分のアプリを起動することができる
SliceViewというものもある．

### はじめかた
adbコマンドでディープリンクのデバッグをするような感じでURLを指定してアプリを起動する必要がある．（初回だけパーミッションの設定がある）

Gradleの`dependencies`に入れればOK

`slice-core`,`slice-builder`,`slice-view`

AndroidManifrest.xmlにProviderを登録する
→重要なのが，`authorities`にスキームを指定すると，sliceのURLになる．

### SliceProvider
`onBindSlice`で動きを実装しよう．

ListBuilderでテンプレートの構築ができる！（かなり楽そう）

### SliceAction
ボタンをタップしたときにする動作とかも作れる

### GridRow
addRowをaddGridRowにすれば色位rな要素を追加できるよ

### SliceManager
SliceManager側がURLを指定して，それに対応するProviderが反応して，SliceDataを生成して，SliceManagerがSliceViewを構築することもできる！

リアルタイムにデータをアップデートすることもできる
`nofityChange`でSliceのURLを指定する

### まとめ
実はSliceは検索だけではなくいろいろなとこで使うことができる！

## 二人目:Android Test
Androidテスト全書 by Peaksが出るよ！

### Android Test
Jetpack:Androidのサポートライブラリとかをまとめてスムースに進むようにしたもの

AndroidTest:デバイス内外でテストが動くようになるなど，優秀なテストサポートライブラリ．

変更があった

RobolectricとInstrumented TestのAPIが統一されました

前者はローカルでテストする．軽い．ただし，JVM上でテスト，Android実機でどうなるかわからない．
後者は本物のAndoridのランタイムで動作．信頼性が高いが，遅い

#### 設定は大変なの？
`testDependencies`にRobolectricの最新版を指定するだけでテストが通る！

### Project Nitrogen
テストの実行の方法も統一したい！
実行環境を抽象化して扱えるようにする．
実機には設定など全部自動でしてくれる．
Googleのプロジェクトでも使用されている（未リリース！！！！）

## Android App Bundle
Android App Bundle:Androidの新しいバンドルの形→Split APIが効果的に使用可能

### BaseAPK
アプリの基本機能．他のAPKがアクセスできるリソースが入ってる

### ConfigurationAPK
特定の画面密度，アーキテクチャごとに分けて必要なものだケアインストールされるようにできる．（Google Playの方でやってくれる）
Gradleのbundleで設定できる．

### Dynamic feature APK
あとでダウンロードするものをまとめられる

モジュールに分けて開発して，そのモジュールのマニフェストにdist:moduleタグを指定

build.gradleにapply pluginする．
play core libraryが必要．

### Dynamic Dellivery
その端末の状態に合わせた部分だけをインストールできる機能．
Google Playが最適化した一つのAPKにしてインストール可能

### Android App Bundle
実態はZIP

ビルドはAndroid Studio 3.2のbuild→build bundleでOK

コマンドラインのときはbundleValiant Gradle taskを実行する

Google Play Consoleに上げるときは，サインしていること，100MB以下であることが条件．
Google Play側でアプリ署名ができるようにする必要がある

bunsleToolが必要．→App BunsleをAPKにするやつ．
このツールを使ってローカルで署名もできるよ．
接続した端末の情報をJSONファイルで出力して，いろいろ使えるよ．

### Q&A
途中で言語設定を変えると，追加でダウンロードされる．

Android 4.4以下では，Split APIがサポートされていないので，全部インストールされる（前と同じ）

最新のGoogle Playでないと，全部インストールされる．

### まとめ
3つのAPKの役割を覚えよう．

App Bundle作るのは簡単だよ．

Dymanic Feature Modulesはコスパ微妙？

## 三人目:Material Components
Material Components:Material Theme Editor（スケッチファイルのプラグイン），Material Components

Androidに限らず，いろいろな場所にUIデザインを提供する

dependenciesに入れるsupport.designを差し替えるだけ

* Bottom App Bar
* Cips(ChisGroup)
* Material Button:BackgroundTintで色とか変えられる
* TextFields
