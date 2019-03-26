# CA.apk #7に行ってきました

## 一人目:DroidKaigiのTimetable
普段はテストの効率化をしている人

### LayoutMangaerの実装
めちゃくちゃたくさん対応しないといけないけど，とりあえずonLayoutChildrenとを知っておけばOK

### onLayoutChildren
レイアウトの初期化をする場所．

LayoutMangaerにRecyclerというモジュールから引っ張ってくる．キャッシュされている場合は，Scrapからとってくる．それがなかったら，Recycled Viewpoolから持ってくる．それもなかったら，indlateしてもらう．

もらったViewをいい感じの大きさにして（Measure）配置する

### scrollVerticallyBy
ユーザのスクロール量が帰ってくるので，一番下がRecyclerViewのTopより小さくなってないか確かめながら消していき，下の方も足りなかったら足していく．

### TimetableLayoutManagerの話
TimetableLayoutManagerでは，正しい順番でレイアウトするには，開始時間とカラム番号によって位置を計算する必要がある．

scrollしたときには縦，横でそれぞれカラムの入れ方を計算したり，しないといけない

## 二人目Single-ActivityのアプリをJetpackで作ってみる．
### Naviagtion
Gradleプラグインを使うと，directionとか言うのを指定するだけでnavigationすることもできる

### Global Action
どのフラグメントからも遷移したいときに使う．

### NavOption
SingleTopとかそういうフラグとかを立てていたが，そういうやつを補ってくれる．

バックボタンを押したときに表示されてほしくないやつが表示されて死ぬ問題．

setPopUpTo()を使うだけ！！！XML上でも，使える．

setLaunchSingleTop()をすると，Activityで言うところのSingleTopのフラグをTrueにしたような挙動になる！！！

### ViewModelのLifecycleOwnerの問題
FragmentでViewModelのLiveDataをobserveするときには，viewLifecycleOwnerを使うと良い．

### SnackBarが何回も出ちゃう問題
LiveDataは，すでにセットされている値を新しくobserveしたときに飛ばすという仕様がある．

Eventというものを使用する．LiveDatan<Event<ほげ>>とするだけ，

### ViewModelのScope問題
by activityViewModelsとか言うのがなんと用意されている！！！w

by viewModelsとか言うのを使うと，activityスコープじゃないのができる．

## 三人目AWAのフルリニューアルを支えたアーキテクチャ
フルリニューアルって，機能とかも全部見直したってことっぽい・・・？

### アーキテクチャの目的
制約をつける！！！

どれくらい自由度を制限してコードを書くか，は，チームとプロダクトによる！！！

人数が多くなればなるほど，自由度は制限したほうが良い！！！

採用も見据えて，予定，展望も考えてアーキテクチャを考える！！！

技術習熟度が低いメンバーが多い場合も，制約は多いほうがいい！！！

ペア・プログラミングとかするなら，自由度は高めでもOK

プロダクトが巨大，複雑であればあるほど，制約は強くしたほうが良い！！！

Feature Moduleで分ける場合には，それぞれのチームでアーキテクチャを統一しなくても良い．インターフェースで喋ればOK（これはあくまでも理想論だが）

### AWAの場合
4人で技術力高めだが，アプリは複雑で巨大だった

→とりあえず，レイヤードアーキテクチャでどこに何を書くのかだけ決めた．

複雑な音楽再生とかダウンロードのところはもっと制約を高めた．

### CQRS
これクッソ昔に更新するメソッドと参照するメソッド（副作用がある部分とない部分）を分けてプログラミングするとかいうやつこの人が喋ってるの聞いた

キャッシュを見せて，しかもリアクティブな画面更新したい！！！

更新系はRepositoryを大きくしないために，DataCommandとか言うEntitiy一つに付き一つのコマンドを作って，実際にAPI Serverとアクセスするのはこいつって言うことにした．

RepositoryはEntityを保存するだけ．これが保存する先はRealm，SQLite，SharedPreferencesなど様々

参照系はDataQueryを作って対応，基本的には全部キャッシュからデータは読み出して来て，表示するだけなので，全部UIスレッドで動いている．

### まとめ
テスト書きながらリニューアルしていた！！！

データフローがわかりやすくなった．

パフォーマンスには注意！！！（Observableで画面更新しているので，大量にObservableが来るとUIスレッドを専有してしまう．）
