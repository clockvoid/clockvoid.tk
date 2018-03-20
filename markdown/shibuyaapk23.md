# Shibuya.apkに行ってきた話

<p class="date">2018-03-20</p>

今日はShiubya.apkに行ってきたので，それについてまとめたいと思います．

なんだか最近いろいろ適当にcompassを入れすぎて頭が追いついていません．（よくない）

直前に人がすごく少なくなったようですが，LIVE配信が今回からあったようです．

## 一人目:Google HomeとAndroid Thingsで家電を操作する
Google Homeて家電操作できるんですね

使っているもの:

* IFTTT
    * IFとTHENでサービスをかける
* FIREBASE Database
* Android Things
    * Raspberry PIとかで動くAndroidらしい
* 赤外線リモコン eRemote mini

赤外線リモコンのAPIが公開されていなかったのでwiresharkを使ってパッケトキャプチャしたらしいです．
かっこいいですね

adbは

```bash
adb connect IP_ADRESS
```

でネットワーク上の端末につながるらしい．

Coroutinesを使って複数処理をまとめて書いてた．かっこいい．

## 二人目:CQRS Archtecture on Android

### CQRSとは
CommandとQueryを分けるやつ．こないだ見た

CQSとは

クラスとか，メソッドは，コマンドか，クエリじゃないと行けない．
コマンドは，内部状態を変えるが，何かを返しちゃいけない．クエリは内部状態を変得ず，内部状態を返すようなものであるという原則．

### CQRS Archtecture
アプリケーション全体をコマンドとクエリに分けて設計する

→これは既存のアーキテクチャと併用される，

Command stackはその全てがコマンドで構成されているわけではない．
ただし，Query stackはだいたいクエリになるが，すべてそうしなくはならないわけではない．

### WHy?
コマンドとクエリが入ったドメインモデルは複雑になりがちだから．
リポジトリが，APIを使うことを明示し始めるとDomain LogicがRipositoryに増えていって，Rrepositoryが膨れがち

→コマンドとクエリを分けて，変更通知をつどクエリにする

### CQRSはFluxに似てる？
Command modelが単純で，データベースがオンメモリなのがJavascript世界で，それのみしか違いがないのではないか．

→FluxもCQSを参考にしている．

## 間奏曲:アルコール
恵比寿Ber，premium black

うまい．

## 三人目:Android アプリ設計パターン入門 第7章 を同じチームの人がもうちょっと語る
Andoridアプリ開発パターン，みんな買ってる．

### Why Archtecture？
大人数でアプリ開発したらどうなる？
→カオス．

だから．
スケーラブルなアーキテクチャを作る

### 採用アーキテクチャ
MVC

データの流れ

### ユーザとのインタラクションがあるような画面はどうするの
状態を2種類に分ける

DomainのStateとViewのState

DomainのStataeは一気にReoisitoryまで持っていく

ViewのStateはViewModelの上で保存する

Activityが消え去っても，ViewModelを復元してViewにつなげれば元の状態に戻るようにする．

Dagger2のcomponent/BehaviorProcessorを使う

`create()`で状態を作って，`finish()`で殺す

## 四人目:PWA時代のAndroidエンジニア生存戦略
PWAの波が来ている

プログレッシブウェブアプリのことらしい．すごく流行ってるらしい

あのウェブサイトをアプリランチャーに登録できるやつか．

ネイティブアプリの存在を脅かしている？

分野によってはネイティブアプリの需要を食ってしまう

Android開発者の需要は正直減りそう
→高度化，先鋭化していく．ネイティブでしかできない，マルチメディア，センサ，高レスポンスのためのチューニングなど

ただし，Android開発の経験は高需要．
→メタファーも共通してる

しかも，Mobile SafariのPush APIがない，ストアの存在の常識化，ユーザ体験の劣化など，まだAWSの世界が来ないのではないかとも考えられる．

Androidアプリ開発，続編が出るらしい．
テストの本，出ます，3月末から4月頭
