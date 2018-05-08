<?php
require './vendor/autoload.php';

$seed=">B0ofMnbI=z5=VRt";
include './top.php';
if (isset($_GET['content'])) {
    $content = $_GET['content'];
    $parser = new \cebe\markdown\GithubMarkdown();
    $parser->html5 = true;
    $parset->enableNewlines = true;
    $markdown = file_get_contents(__DIR__.'/markdown/'.$content.'.md');
    if ($markdown === false) {
        $markdown = "# File Not Found: ${content}";
    }
    echo $parser->parse($markdown);
} else {
?>

<h1 style="font-weight: bold;">Blog</h1>
<p>
    このサイトを自作のブログとして管理します．
</p>
<div class="flex-container">
    <div id="element">
        <strong>
            <a href="./blog.php?content=cake_auth">
                <p>CakePHPで認証周りを作ってみましょう．</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-05-08</p>
        <p>
            CakePHPで認証周りを作ってみたかったので，まとめてみました．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=laplace">
                <p>Laplace変換チートシートを作ってみました．</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-04-17</p>
        <p>
            Laplace変換，多用してますよね？
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=react_ts">
                <p>TypeScriptでReact入門してみましょう．</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-04-15</p>
        <p>
            TypeScriptでReactしてみました．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=shibuyaapk24">
                <p>shibuyaapk #24に行ってきました．</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-04-13</p>
        <p>
            Shibuya.apt #24に行ってきたので，まとめます．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=archlinux_haskell">
                <p>Arch LinuxでHaskellを使う際にやっていること</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-29</p>
        <p>
            Arch Linuxでは地獄と言われるHaskellの環境構築についてまとめてみました．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=2018-03-28">
                <p>CookPad Tech Kitchen #15</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-28</p>
        <p>
            CookPad Tech Kitchen #15に行って来ました
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=2018-03-26">
                <p>Bonfire Frontend #1</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-26</p>
        <p>
            Bonefire Frontend #1に行って来ました
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=shibuyaapk23">
                <p>Shibuya.apk #23</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-20</p>
        <p>
            Shibuya.apk #23に行ってきたのでまとめてみます．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=bootstrap">
                <p>Bootstrap with CakePHP 3.x</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-20</p>
        <p>
            CakePHPでBootstrapテーマを適用してみましょう．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=2018-03-12">
                <p>Bonfire Android</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-12</p>
        <p>
            Bonfire Androidのミートアップイベントに行ってきたので少しまとめてみました．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=kotlin-coroutines">
                <p>KotlinのCoroutineについて</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-07</p>
        <p>
            KotlinのCoroutineについて少しだけまとめてみました．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=2018-03-06">
                <p>このサイトの仕組み</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-06</p>
        <p>
            このサイトの仕組みについて少しだけまとめてみました．ブログ機能で悪戦苦闘しています．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=archlinux">
                <p>Arch Linuxでやってきたこと</p>
            </a>
        </strong>
        <br>
        <p class="date">2018-03-06</p>
        <p>
            僕がArch Linuxでやってきた設定などです．秘伝のタレです．
        </p>
    </div>
</div>

<?php
}
include './bottom.php';
?>
