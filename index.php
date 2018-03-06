<?php
$seed=">B0ofMnbI=z5=VRt";
include './top.php';
?>
<h1 style="font-weight: bold;">基礎のほーむぺーじ</h1>
<p>
    こんにちは．基礎のホームページヘようこそ．ゆっくりしていってね．
    <br>
    現在工事中です．色々用意できていないページがありますが，
    ご容赦ください．（先人への敬意）
</p>
<div class="flex-container">
    <div id="element">
        <strong>
            <a href="./about.php">
                <p>About</p>
            </a>
        </strong>
        <br>
        <p>
        Aboutページです．プロフィールなど紹介しています．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./contact.php">
                <p>Contact</p>
            </a>
        </strong>
        <br>
        <p>
        Contactページです．GitHubやTwitterなどはこちらから．
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./reversi.php">
                <p>Reversi</p>
            </a>
        </strong>
        <br>
        <p>
        デモで作成したReversiのコードです．一応ここにリンクを貼ります．
        </p>
    </div>
</div>
<h1 style="font-weight: bold;">Blog</h1>
<p>
    このサイトを自作のブログとして管理します．
</p>
<div class="flex-container">
    <div id="element">
        <strong>
            <a href="./blog.php?content=2018-03-06">
                <p>このサイトの仕組み</p>
            </a>
        </strong>
        <br>
        <p>
            2018-03-06の記事
        </p>
    </div>
    <div id="element">
        <strong>
            <a href="./blog.php?content=archlinux">
                <p>Arch Linuxでやってきたこと</p>
            </a>
        </strong>
        <br>
        <p>
            僕がArch Linuxでやってきた設定などです．秘伝のタレです．
        </p>
    </div>
</div>
<?php
include './bottom.php';
?>
