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

## 
