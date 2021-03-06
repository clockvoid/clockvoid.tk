# FlutterのGetStartedをやってみた

<p class="date">2018-12-01</p>

Flutterの[GetStarted](https://flutter.io/docs/get-started/install)
をやってみたので，その感想を含めていろいろ書いてみたいと思います．

## Installation
インストールはどの開発を始める上でも最も大切でかつ最も難しいことだと思います．

私は普段，Androidの開発はWindowsで行っておりますので，必然的にここではWindowsでの作業を記述することになります．

まず，Flutterのインストール時には，Androidの開発環境が整っていることが前提となるようです．
理由としては，そもそもFlutterの開発そのものをAndroid Studioを使って行うこと，また，Android SDKがインストールされていないと，そもそもビルドができないことが挙げられると思います．
したがって，Androidの開発環境が整っていない場合は，これをインストールするところから始めましょう．

ただ，Dartの環境が整っていなければ行けないかはよくわかりませんでした．私の環境ではDartがインストールされており，これがないとFlutterが動かないかどうかは試していないのでよくわかりません．
GetStartedのInstallのページにはそのような記載はありません．

さて，前提条件を確認したところで，インストールの手順を記述します．
まず，Chocolateyで検索してみましたが，出てきませんので，おそらく誰もパッケージを作成していないものと思われます．おとなしく公式のガイドに従いましょう．

公式のガイドに乗っている通り，ZIPファイルをいい感じの場所に解凍して，PATHを通すとFlutterが使えるようになりました．
バージョンは，解凍したディレクトリがGit Directoryになっており，`origin`のURLがFlutterのGitHubのものになっていましたので，`pull`すれば最新のものが常に手に入りそうです．

ここまででFlutterのインストールはできましたので，Android StudioかIntellijにFlutterのプラグインを導入する必要があります．
以下の図にあるように，Browse RepositoriesからFlutterを検索し，インストールします．このとき，Dartのプラグインもインストールするか聞いてくるので，インストールしてしまいます．

## Write Your First App
ここまででインストールはできたので，アプリを書いてみます．

と言っても，このページの通りやればできてしまいますので，ここでは私なりの感想を書きます．

まず，Flutterはかなり来そうです．Write Your First Appはたった数スクロールで記述された記事であり，それをやるだけで無限スクロールを使ったViewを作成できてしまいます．
この手軽さがありながら，デバッグも慣れ親しんだAndroid Studioでできるため，とてもやりやすいです．しかも，ネイティブであることを考えれば，いいことずくめのように感じます．

私的に気に入っているのは，ViewをReactみたいにかけることです．これができることで，リアクティブな書き方が容易になっているのだと思います．今までのXMLによるViewの開発はもう終わったのかもしれないとか思いました．XMLでは，インタラクティブなViewを作成するときに，
