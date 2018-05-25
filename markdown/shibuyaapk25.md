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
