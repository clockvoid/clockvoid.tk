# Shibuya.apk 28

<p class="date">2018/09/28</p>

Shibuya.apk #28にお邪魔して来ましたので，LTの内容などをまとめてみます．

## 一人目:レンダリングしていますを改善する
プライバシーポリシーの更新でアプリを消されてしまったらしい・・・（かなしい）

### レンダリングしていますとは
* Android Vitalsの指標の一つ．
* 遅い表示とフリーズしたフレームがある

遅い表示とは，50%を超えるフレームで表示に16ms以上かかったということ．
フリーズしていますとは，1%を超えるフレームで表示に700ms以上かかったということ．

### どこの画面が遅いのかを知る
Firebase Paformance Monitoring:Betaを抜けた

Activituの計測は自動で行ってくれる．→build.gradleに書くだけ．

Acctivity毎に遅いフレーム，フリーズしたフレームが出る．

### 1Activityで，Fragmentで切り替えるアプリだとどうするの？
Firebase Paformanceのカスタムトレースを使う

使い方:Traceというクラスを名前をつけてスタートし，最後にストップ．

Activityの自動計測は，onActivityStartとonActivityStopでTraceをスタート，ストップしてるぽい・・・

#### FrameMetricsListener API
* UIレンダリングぽフォーマンスを監視する．
* adb shell dumpsys gfx infoと同じ内容．
* 最新の120フレームに制限されない．

#### 実際に，さっきのActivityでやってたやつをFragmentに移植してみる
Githubに[コード](https://github.com/iiinaiii/AndroidPerformanceSample)があるみたい．

これで，画面単位でどこが遅いかを知ることができた．

### 画面内のどこが遅いかを知る．
Systrace（とか）を使う．

platform-tools．CPU利用状況とか

遅いFrameの割合でfaviconの色が変わる

処理の単位に名前をつけることもできる

ショートカットがたくさんある

RecycledViewPoolを使うとRecyvlerViewが早くなるらしい

## 二人目:MotionLayoutdeMaterialDesignを改善する
MotionLayoutとは
* ConstraintLayout 2.0に含まれている
* 今日現在，2.0.0-alpha2
* 2つのレイアウト間の遷移をいい感じにしてくれる

FromとToの2つのレイアウトがあると，その2つの間をいい感じに遷移してくれる

全く別の2つのlayout.xmlがあるわけではない．→1つのLayout XMLとMotionScene XMLで表現!

MotionScene XMLは，
* Constraint Setを複数持つ．:直接記述でも，参照でもOK
* 遷移の仕方を指定する．:鳥が，繊維途中のキーフレーム
* View自体の定義は持たない．

### FABのモーフィングがしたかった！
普通にやっちゃうと，なんか悲しい感じになった．

FABを四角くするためのCustom Viewを自作．

KeyFrameでいい感じにアニメーションの終了時間とかを指定しまくったらきれいに動く．（KeyFrameSetたくさん生えまくって大変そう）

夏コミの"技術の夏，未来の夏"に詳細があるとのこと．

## 三人目:Functional Programming in Kotlin with Arrow
Arrow:モナドを意識して作られたライブラリ
関数型言語を実現するためのKotlinのライブラリ！

### Data Type
* Data Types
* Type Classes
* Effects
* Option

### Option
Null安全よりも安全にプログラミングしようということらしい．
値があるか，ないか．Maybeモナド．

### Either
例外処理を書くやつっぽい．（Haskellで例外書いたことない・・・）

Leftにエラーを入れて，Rightに正常なデータを入れて使うらしい．（よくわからん）

### Validated
成功値はエラーの戻り値をモデル化するためのもの

エラーをいくつか蓄積できる．

EitherとかこれとかはtoOptionでOptionになる

### Semigroup
複数のエラーを合成できるもの

### Try
例外が発生する可能性のある関数呼び出しをモデル化する

### Integrationが存在する．
* RxJava2
* Project Reactor
* Kotlin Coroutine

### まとめ
まぁ，あくまでヘルパーとのこと．

でもヘルパーでモナドの世界を構築しちゃったらもとの世界にも副作用が存在するのにとても扱いがやばくなりそう・・・

## 四人目:Request in a QUIC way
AbemaTVの人らしい．

### QUICって何
Quick UDP Internt Connection

Googleが開発してる新しいプロトコル．

Googleのサービスとかはだいたいこれで通信してるらしい．動画に強いのかな？

QUICの上にHTTP/2 APIとか言う，UDPなのにHTTPっぽく通信できるラッパーが存在するらしい．

### メリット
* Connectionの設立がすごく早い
    * UDPなので，そもそも3wayハンドシェイクが存在しない．（初回では1RDT，二回目以降は0RDTで接続が確立する）
* 通信の多重化もできる
    * TCPでは，順番が保証されるため，前のコネクションが失敗すると止まってしまう．
    * UDPなので，複数のストリームをガンガン流せて，あるパケットが欠損していても，そのストリームだけが止まる
* マイグレーション
    * TCPでは根ネットワークがへんこうされると，いちいちコネクション確立をやり直す
    * QUICはUDPなので，ConnectionIDだけで管理していて，これが変わらない限りコネクション確立が怒らない

### Androidで使うためには
Cronetを使う．

Android Developpersにもページが存在．

まず設定で，QUICに対応してなかったらHTTP2で接続できるようにとかもなってる．

HTTPっぽく接続できるので，メソッドもGETとか，Headerという概念も存在して，今までどおり使えそう．

結果は，UrlRequest.Callback()の実装で受け取る．

### ExoPlayerにはExtentionもあります
簡単に対応できるよ！

### HTTP VS QUIC
早い回線でも，遅い回線でも，動画のバッファリングレートが減ってる！
