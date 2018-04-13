# Shibuya.apk #23に行ってきた話

<p class="date">2018-04-13</p>

## 一人目:JavaでもKotlinでも使えるLint
今まではklintとdetektっていうのしかなかった．

android-lintとかいうやつが新しくできた．

いいところ
* 公式
* gradle lint出できる
* KotlinだけでなくJavaもできる．

### それぞれの特徴．
ktlintやdetektはスタイルの確認が中心．

android-lintはそれに加えて，ロジックもチェックできる．

### Custom Lintの作り方
PSIツリーを知らないとだめ．

ツリー構造になっていて，3つ目のwhitespaceには改行コードが入っていることを確認！

ツリーどうなってるかわからない→PsiVirewe使いましょう．

* プロジェクトを作る
* ディテクターを作る:UIElementHandlerを実装する→ノードを上から調べて，それそれぞれを見て処理を変えるもの
    最後の返り値がきちんとしているかを確認できる！
* Issueを作る
* Resistoryに登録する

### テストメソッドの書き方
対象コードを文字列で用意する．
それをkotlinファイルとして渡して，エラー文言があってるかをexpectメソッドで確認する

### つかいかた
dependenciesにlintChecksを追加するだけ．

## 二人目:Remote Config REST API and Versioning
リモートコンフィグってのがあるらしい．

### リモートコンフィグとは
Firebase．

アプリの更新をGoolge Play Store経由でなく行うことができる．
この間クックパッドで使ってたやつか．

クライアントはAndroidとiOSが対応．

GETオンリーのKVMシステム

Remote Config Objectしか触らない．

キャッシュなども全部やってくれるし，面倒くさいことは全部やってくれる．

WEBのクライアントがあった．これをPUBLISHを押すと，全部更新される．
→バリデーションがなかった．
自動でアップデートができなかった．
ボタンを押すのを忘れていた．
差分が見えない，誰が？とか何が？がない．
開発者以外にフレンドリーでない．（マーケッターなど）

単一のJSONストアっぽい．
アクセストークン制→アクセストークンを撮ってくるという作業が必要．．

### 何ができるか．
* Value validationがある．
* アプデートが自動でできる．
* diffもできる．
* うまく組み込めば，非エンジニアでも使える．

Value JSONはリーダブルじゃない．→RemoconというSDKを作ってくれた．

### CIではどするの
ブランチで操作を変えたりして使う

teraformというインフラ系のツールがあるが，それに近いものを作りたい．

### 今後
* 差分ベースのアップデート
* セマンティックでリーダブルなdiff

[ベストプラクティス](https://goo.glUw5nzq)

## Android Studioのテンプレートを覗いてみよう
Droid会議でCreanArchtectureのテンプレートを作った話をしてる人．

15分くらいかかってた作業が一瞬でできるようになった．

テンプレート作ると，新しい画面の雛形などを作れる．→自分好みでないときなども自作できる．

アーキテクチャの雛形も作れる．→オレオレ実装を減らせる．
定型文の部分も自動で作れる．

ライブラリの解決とかもできる．→バージョンの問題などからも開放される！

### テンプレートってどうやって作るの？
plugins/android/libs/templates/activitiesに入ってる．

ファイル構成は，recipie,template,\*.kt.ftlなどが重要．

* template.xml
    * はじめに出てくるパラメーターを入力する画面で使う．
    * String, Boolean, Enum
* recipe.xml.ftl
    * Freemaker
    * xmlにif文など追加できる．
    * ファイルの作成とかオープンとかマージとか
    * gradleとAndrid Manifestのみマージできる→動作がおかしいことがあるので，極力使わない．
    * dependenciesを指定できる．
* activitie.kt.ftl
    * アクティビティの雛形
    * root/にファイル群を配置
    * src/クラス系
    * res/リソース系
    * root/それ以外

### まとめ
複数クラス同時作成や，アーキテクチャの導入が簡単にできる！！！

すごい！
