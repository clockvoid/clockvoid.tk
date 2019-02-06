# Shibuya.apk31に参加しました

<p class="date">2019-02-06</p>

Shibuya.apk31に行ってきました．
今日はスペシャルゲストをお迎えしての講演とのことで，とても楽しみです

## 一人目:AAB
サンタトラッカーを例に

Android WearとTVにも対応してるでかいアプリらしい
12/24だけサンタをトラッキングできる

アプリの大きさを今60MBのところを10MBにしたいというのが目標らしい．
AABにすると20%も削減される．
多言語対応とかを分けられる
./gradlew bundleReleaseでできる

ゲームごとにモジュールを分けてインストールさせるらしい

2ヶ月くらいかかるくらい大変らしいけど，めっちゃちいさくなる

## 二人目:Room2.1で追加されたこと
まだアルファ

SQLiteはいいけど，Android で使うとなると辛い

コルーチンとかに対応したらしい

アノテーションをつけたときに返り値の型をかけるようになた

コルーチンRoomのDaoに書いた関数をsuspendにするだけっぽい

全文検索FTSを使えるらしい

View:N対N対応なデータベースで同じテーブルに入っていない複数要素を同時に簡単に取れる

複数インスタンスで同じデータベースを使う機能もできたInvalidationなんとかかんとか

## 三人目:Android Text
GoogleのAndroid Textチームの人らしい

PrecomputedText:非同期にテキストのスタイルをつける
Android 8からスレッドのパフォーマンスが良くなった

Typeface.Builder:ダウンロードフォントの種類を選べる
Variable Font:フォントの太さとか選べる

Locale List Fallback:マルチロケール対応！中華フォントで出ちゃうのを防げる

英語以外のセリフフォントにも対応

Justification:両幅合わせ

高さの高いフォントを使ってもオーバーラップしないようになった．:ただし，レイアウト崩れの恐れあり

## 四人目:Kotlin:Uncoverd
なんとKotlin先週始めたらしい！

Kotlinはすごいけど結局はJavaのコンパイラを使っているので，注意しないといけないよ

Kotlinがどのように動いているか知る方法
Memory Profiler
Kotlin Bytecode:カーソルがある行のバイトコードがハイライトされる便利機能
Java Decompilation

Intと型を指定すると，Javaの型はintだが，NullableにするとIntegerになる

KotlinBytecodeはARMアセンブリとかと比べるとそのまま書いてるからクソ簡単だぞとか言ってた

Bytecodeを読みたくなくても大丈夫，でコンパイラーを使えば良い．

Memory Profileを使うと良い．

ここで，0から10,000まで代入するコードを書いてProfilerで確認すると，9,785回くらいしか書き込みが発生していない．
これは，JavaのInteger.caceとか言うのがいい感じにキャッシュしてるかららしい．なんでそんなの知ってるんだろう

Lazy手動でやるにはゲッターでいい感じに書けばいいが，by Lazy{}を使うと裏側はすげえ大変なことになってる

まぁ，実は難しいこと考えなくてもARTはすげえ．だけど，中でなにが起こってるのか知りたい場合にはこういうテクニックを使ってみる

## 五人目:IOSched (Google I/O app)
今年は全部書き直した

LiveData,ViewModel，Clean Architecure などを使ったらしい

これ見ればこの辺わかる

プレゼンテーション層にViewmodel入れてる．DOMAIN層にUseCase（なぞ），Data層にRepository 

UseCaseはexecute()とか言う関数を持っていて，それでRepositoryにアクセスたり，ViewModelから呼び出されたりするっぽい

で0多層でLiveDataを作ってる，んで，データベースからのデータと，他の端末によって変更された情報をもらってMediatorLiveDataで組み合わせるらしい

今年のGoogle IOは5月7-9になった
