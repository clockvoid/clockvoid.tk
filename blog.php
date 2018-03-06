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
}
include './bottom.php';
?>
