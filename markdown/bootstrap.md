# CakePHPでBootstrapを使って見た話

<p class="date">2018-03-20</p>

## 成り行き
私は[IEEE TOWERS](https://www.young-researchers.net/)の実行委員会として活動しており，その広報担当としてWebサイトの運営をやることになりました．

そこで，もともとあったWebサイトがBootstrapで作成されていたため，私もBootstrapを用いてデザインを作ろうと決めました．

更に，私が作成することになったのが，認証システムの開発でしたので，CakePHPを使って楽をしてやろうと決めました．

ここで，CakePHPのViewにBootstrapを用いた装飾をすることが決まりました．👏

## BootstrapUIの導入
CakePHPでBootstrapを扱う方法はたくさん存在しますが，今回は[friendsofcake/bootstrap-ui](https://github.com/FriendsOfCake/bootstrap-ui)を使うことにしました．

これを選んだ理由は，他のものと比べて最終更新日が最も遅かったからです．

ところで，このプラグインは素晴らしいことに，`composer`で読み込むだけで使用できますので，まずは，アプリケーションのルートディレクトリに行き，

```bash
composer require friendsofcake/bootstrap-ui
```

として，次に，CakePHPから読み込むことを明示するため，`config/bootstrap.php`に（このbootstrapはCSSフレームワークのbootstrapではない）

```php
\Cake\Core\Plugin::load('BootstrapUI');
```

と記述します．これで使用する準備が整いました！

## 実際に使ってみる
まずはViewにBootstrapを適用してみましょう．`src/View/AppView.php`を開き，以下のように編集します．

```php
<?php
namespace App\View;

use BootstrapUI\View\UIView;

class AppView extends UIView
{

    /**
     * Initialization hook method.
     */
    public function initialize()
    {
        //Don't forget to call the parent::initialize()
        parent::initialize();
    }
}
```

この後，ControllerとTempleteを書いていきます．ここでは，`\test`というポイントを作成することにしてみましょう．

Controllerは，`src/Controller/TestController.php`に
```php

<?php
namespace App\Controller;

use App\Controller\AppController;

class TestController extends AppController
{

    public function index()
    {
    }
}
```

を記述し，Templeteは`src/Templete/Test/index.ctp`に

```php

<header>
    <div class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-collapse collapse" id="navbar-main">
                <ul class="nav navbar-nav">
                    <li><a href="#">Top</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#previous">History</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </div>
</header>
<div class="container theme-showcase" role="main">
<?php
    echo $this->Form->create();
    echo $this->Form->input('textbox');
    echo $this->Form->input('select box', [
        'type' => 'select',
        'options' => [1, 2, 3]
    ]);
    echo $this->Form->input('radio', [
        'label' => 'radio',
        'type' => 'radio',
        'options' => [1, 2, 3]
    ]);
    echo $this->Form->input('checkbox', [
        'multiple' => 'checkbox',
        'options' => [1, 2, 3]
    ]);
    echo $this->Form->button('Submit', [
        'class' => 'btn btn-primary'
    ]);
    echo $this->form->end();
?>
</div>
```

と記述します．これは，先程のGitHubにも説明があるとおり，Bootstrapの部品を作成するためのPHP式を含んだctpファイルになっています．

これで一安心ですが，これだけではBootstrap本体がありませんので，スタイルが適用されないただの文字が出力されてしまいます．
そのため，Bootstrapの本体を入手する必要が出てきます．直接ダウンロードしてローカルに保存する，CDNを使う，など様々な方法がありますが，バージョン管理の観点から，ここではbowerを使ってインストールするのが最も賢い方法であると考えます．

早速，Bowerをインストールします．

```bash
npm install -g bower
```

次に，Bootstrapをインストールし，それぞれいい感じに読み込まれるように移動します．

```bash
bower install bootstrap
mkdir -p webroot/css/bootstrap webroot/js/bootstrap webroot/js/jquery webroot/css/fonts
cp bower_components/bootstrap/dist/css/* webroot/css/bootstrap/.
cp bower_components/bootstrap/dist/js/* webroot/js/bootstrap/.
cp bower_components/jquery/dist/* webroot/js/jquery/.
cp bower_components/bootstrap/dist/fonts/* webroot/css/fonts/.
echo /bower_components >> .gitignore
bower init
git add .gitignore \
bower.json \
webroot/css/bootstrap \
webroot/js/bootstrap \
webroot/js/jquery
```

ここではgitについてのコマンドも記述されていますが，ここではあんまり関係ありません．
また，`bower init`するといろいろ聞かれますが，エントリポイントとignore caseを空にすることと，dependenciesをちゃんと記録することのみを注意してあとは適当にEnterを押します．これでやっと`bower.json`が出来上がります．

ここまで来たらもう安心です．実際にページを表示させてみると，Bootstrapっぽい表示が現れます！

## Bootstrapテーマと独自のCSS
ここで，Bootstrapテーマを適用したり，自分で書いたCSSを読み込ませたくなることがあります．

まず，Bootstrapテーマは，`bower`でインストールして，先程のコピーの工程をやり直しましょう．
簡単に適用されるはずです．

また，独自のCSSは`webroot/css`下に適当においておき，`src/View/AppView.php#initialize()`にて

```php
$this->Html->css('hoge.css');
```

を追記します．このコードによって，CSSを読み込む`<link>`タグが`<head>`に自動生成されます．ただし，一番上に生成されてしまうため，Bootstrapの読み込み前であることに注意してください．場合によっては`!important`を使うしかないかもしれません．

## まとめ
これでデザインはバッチリです．

あとはビジネスロジックの実装だけですね．

がんばりましょう🎉
