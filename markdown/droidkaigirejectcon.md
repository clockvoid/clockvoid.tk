# DroidKaigi Rejectconに参加してきました．

<p class="date">2019/02/13</p>

今日はDeNAでDroidKaigiのRejectConがありましたので，まとめを書きます．

## Androidでマルチタスキング
実は中身はコルーチンの話だった・・・

はじめにAndroidでアプリ作るときにはUIスレッドを止めてはいけないとかそういう話があって，それを実現する方法としてCoroutineを紹介している．

### Coroutineをたくさん動かしてみる
たくさんCoroutineを動かしても，CPUの実コア数を超えてThreadは生成されない

Coroutineにとって，Threadとは，Threadにとって，CPUのようなものである

### Coroutineの解決する問題
その昔，AndroidでマルチスレッドスレにはHandlerThreadとAsyncTaskを使っていた
→ライフサイクル似合わせるのが難しい，Callback Hell

次に，RxJavaが出てきた．
→大げさ（？），そもそもStreamを扱うライブラリだったはず．

## Kotlin/Native for Multiplatform
フリーランスの人

KotlinWeeklyのパブリッシャー！！！強すぎ

コストを小さくして，クオリティをおおきくしたいよね
→プラットフォームごとにコードを分けずに，同じコードベースでやろうとするよね

ここでは，Kotlin/Nativeの話をするよ

Javaは24歳！

### Kotlin
* Iterop
* コミュニティサポート
* 全部同じ会社が手がけてる

はじめから全部共有するのではなく，少しずつ切り替えるべき

### Kotlin/Native
まだアルファ

CommonというコードベースからJVM用のバイナリとかネイティブアプリとかが作れる．

でも，UIは共有しない！クソ辛い．

実はLLVMを使ってる

コンパイラを使ってIRとか言うのにして，それをLLVMでネイティブコードにする

ARCとか言うのを使ってメモリマネジメントしてるので，メモリの開放とかは考えなくて良い（？）

Kotlin/Nativeから他の言語で書いたコードを呼び出せる！C，Objective-C，Swift

klibとか言う形で，Kotlin/Nativeのライブラリを作れる
→JetBrainsはここで作ったライブラリを導入するやつ（Gradle的な）やつを開発してる！！！

expect/actualとか言うものがあるらしく，expectでとりあえず抽象を書いて，actualでJVMとか向けの実装を記述する

Frozen objectとか言うものがあるらしく，すべてのThreadで同じオブジェクトが共有できる
→今までのオブジェクトはそうではなかったが，atomic-fuとか言うのを使うことによって実現可能になる
まじでよくわからん．

### 使いかた
とりあえずクローンしてビルドしてkotlincする．

しっかし遅い！→JetBrainsは早くすると公言

### Flutterとの比較
FlutterはUIをカスタムするのがとても得意

### おすすめの使い方
コンポーネントを共有する

### リソース
* Kotlin Slack
* Touchlab 
* KontlinWeekly
* K/N Documentation
