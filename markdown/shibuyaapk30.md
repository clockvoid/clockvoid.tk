# Shibuya.apk 30に行ってきました

<p class="date">2018-12-13</p>

今日はShibua.apkの30回開催に行ってきたので，まとめてみます．

## 一人目 DaggerからKoinに乗り換える
DIコンテナの話

Koinとは
* Kotlin製のDIライブラリ
* DSLを使った簡単な記述で依存性が記述できる
* AndroidのViewModelを公式サポート！

基本的には汎用のDIライブラリ．
Androidようには，KoinAndroidとか言うやつがある．
ドキュメントが充実．

依存性の注入を実際にKotlinのDelegateを使って実現．
Daggerのように変なコードを生成しない．
inject()関数は内部てLazy担っている！

AACのViewModelの注入はby viewModel()ってやるだけでできる

スコープの制御もだいたいDaggerのアノテーションが関数になっている感じになっているが，スコープを作るときはscope()関数を使用．

メリットは，楽．デメリットは，コンパイル時にインジェクションするDaggerに対して，実行時パフォーマンスが下がること．
最適化はまぁできる．module定義時にcreateOnStart=falseを指定．

どのようなプロジェクトでメリットが大きいか？
* 小さなKotlinのプロジェクトで，まだDaggerに依存していないもの．
    * 向いていないのは，Javaが入っているプロジェクト
    * あと，大きいプロジェクト（パフォーマンス）

## 二人目 Navigation Architecture Component 入門
CoopadTVの人

まだalpha08！w→変更あるかも

基本亭にはFragment→Fragmentの遷移！w

build.gradleにktxを使ったほうがいい．（公式もそうしているので）

引数が取れるらしい．

GUIだと右側にArgumentsとか言うのがある．もらう側で設定する．引数名，型，デフォルトバリューを指定できる．
型はBoolean，Array（interget[]とかする），Enum，parcelableお使える．nullableも使える．
渡す側は，コード生成でできたsetName的な関数で引数を設定する．
そいで，もらう側はSecoundFragmentArgsとかで引っ張ってこれる．

NavigationUIとか言って，ActionBarの左にある矢印の制御とかができる．
appBarConfigulationとか言うものを作る．
矢印ボタンを押したときの処理をonSupportNavigationUp()に書く．

MenuItemも制御できる．
FragmentのIdとMenuのIdを一致させておき，コードで指定すればいい感じに遷移する．
BottomNavigationも同じ．

Shared Element Transitions:サンプルコード見る

## 3人目 それっぽいカルーセルを実現する
どろくさいUIを作るらしい．

画面いっぱいにアイテムコンテンツとかを出すカルーセル
今回はRecyclerViewで実装しよう．

SnapHelperとか言うRecyclerView.onFlingListenerを継承したクラスが存在する．
フリングしたときに子Viewにフリングする

ItemDecolationで表示するもののマージンとかを指定できる．