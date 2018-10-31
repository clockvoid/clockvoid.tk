# Shibuya.apk29に行ってきました

<p class="date">2018-10-31</p>

今日は本当は日付を間違えていて，全然行くつもりはなかったけど当日Shibuya.apkで登壇する人のツイートを目にしてしまったので行くことにしたShibuya.apk 29について，まとめてみます．

地味にハロウィン開催ですが，いつもと同じです．

## 一人目:Conference Tourism
Kotlin Confに行ってきたYahooの人．黒帯．クソ強いと思う．

いかにして会社のお金を使って，カンファレンスに行くか

海外に行くお金を会社が負担してくれるというムーブがある．

### Droidcon
ルーマニア．実はITの分野で進んでいる．

エンジニアにとって重要なビールが，2.5Lで180円！

インターネット回線が早くて安い．月額1200円

エンジニアの女性率が高い．25%女性．イイね！

ITエンジニアの給料は国の中では高い．

所得税が技術者は0！

Droidoconは世界最大のANdろいdエンジニアコミュニティ．いろんな組織体で違ったDroidokconが開かれている．

### こんなところで登壇するにはどうしたらよいか？
* トピックを見つける
    * キーワード+どう話すかを分けて考える．
    * すでに詳しいことを選ぶ必要はない．あまり難しいやつじゃなければOK．
    * どう語るかは，いろいろある．はじめに何するか，ディープイントゥ，ベストプラクティス，バッドプラクティス等
* カンファレンスを開く
    * トピックに適したものを選ぶ．
    * エンジニアが参加者なのか，マネージャが参加者なのか．
    * トラック数を見る，少ないトラック数の場合は万人受けしそうなやつ
    * 録画されることが重要．（YouTubeで公開されると良い）
    * 会場設備（スクリーンの明るさ，部屋の大きさ）
* Proposalを投稿する
    * それ見た人が聞きたくなるようなものを書く．
    * カンファレンスに合わせる．（Androidのイベントで話すのか，Kotlinのイベントで話すのか？）
    * キャッチーなタイトル（キーワードを気をつける．JetackとかCoroutineとか）
    * 課題意識が伝わること．（どういう課題があるのかをはっきり書く）
    * 面白いポイントがわかること．（事実の羅列だけではなく，ちょっと自分の意見を入れるなどする）
* 資料をつくう
    * 採択されてから資料をつくる！
    * スライドは16:9のほうが良い．
    * スライドからいらない要素は省く，スペースは広く！
    * テキストは大きく少なく！
    * 箇条書きに気をつける．自分で読むスピードに合わせて出す．
    * コードはハイライト！自分の喋っている位置に合わせて色をつけるとわかりやすい．
    * 資料にはこだわりすぎなくて良い．
    * 練習はしっかりとしたほうが良い！スピーカーズノートは見ないで覚える！

大変だけど楽しい！

## 二人目:More Android Studio Debugger 〜そんなことできたんかお前！〜
知ってると楽になるAndroid StudioのDebugger

ブレークしているときにEvaluationとか言う機能があるらしい．

Exception Breakpoint:Exceptionが起こったときにブレークできる機能がある．ブレークポイント一覧の画面から，Java Exception Breakpoint．

Condition Breakpoint:設定した式の演算結果がtrueだったときにブレークする．

Temporary Line Breakpointはじめにブレークポイントに達したときのみブレークする二回目以降はブレークしない．

PassCount Breakpoint:ブレークポイントに指定した回数達したらブレークする．

Evaluation/Logging Breakpoint:ブレークポイントが実行される手前で，指定した式を評価してくれる．実際のオブジェクトが変更される．

Non-suspend Breakpoint:停止しないブレークポイント．Evaluate/Loggingとか，PassCountとかは生き続ける．

Android Profilerもとても良くなった．

## 三人目:Androidをやっただけで iOSアプリもできればいいのに 〜MOEという選択〜
ReactNativeとかFlutterとかXamarinだと言語がいつもと違う！

普通にAndroid Appを作っただけでiOSアプリになったらいいな→Intel Multi-OS Engie（MOE）

### MOEとは？
AndroidとiOSのアプリをJavaとKotlinで開発できる

一番大事なこと:Androidアプリに影響を与えない！

### 実際にやってみる
少しだけ気を使う必要あり
iOSとAndroidのViewを別々に作って，PresenterとModelは共通化できる

CommonModuleはいつもどおり，RetrofitとRx使ってModelを作って，ViewModelから呼び出す．

AndroidのViewもいつもどおり．

重要なことは，CommonModlueにAndroidの世界のものを入れない（Clena Architecture実践すればOK）

iOSのViewもAndroidStudioでかける．（プラグイン入れる．）
プラグインがいろいろ作ってくれるので，プロジェクトが作られたら，XcodeでiOSのUIを作成する．（この作業にMOEは完全に関係ない）これ，絶対Macないと無理じゃん．

作ったら，CreateViewBindingする．すると，なんかよくわからんがUIViewControllerとか言うのが作られる．ここまで来ると，iOS側の挙動をJava，Kotlinで書いていくことが可能．

NatJによって，iOSのネイティブなAPIにフルアクセス可能！との触れ込み．

### 人気がない
一応，コミュニティがあって，いろいろやってくれる．[link](discuss.multi-os-engine.org)

## 四人目:読みやすいコードを書くために気をつけてること/Tryしたこと３つ(仮)
稀によくある問題を割とよくある手法で解決する

### 意味と成約を表現しよう
似てるけど意味の違う変数をどうしよう？

data classとinit関数を使って成約して型情報もつけちゃおうという解決法．

Kotlin 1.3からのInline classは？→initメソッドを持てない．型情報をつけるときのみ使える．

### 無を表現しよう
Nullableを使いたくない（エラーでNullableになっちゃったか，見つからなかったのかがわからないときなど）に，返すクラスに"無"を作ってそれを返すようにする．

Nullになることが正常系の範囲内である場合や，例外処理が不要になる場合は，無を表現しよう．
NullがありえないものはNullableでもいいのでは．

### レビュー観点をシェアしよう
PRの指摘箇所が多すぎてしんどいことがある．

会議室を選挙してモブプロっぽいレビュー会をした．
