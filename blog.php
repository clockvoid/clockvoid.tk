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
            <a href="./blog.php?content=kotlin-coroutines">
                <p>KotlinのCoroutineについて</p>
            </a>
        </strong>
        <br>
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
}
include './bottom.php';
?>
