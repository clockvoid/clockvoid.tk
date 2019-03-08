# Shibya.apk #32に行ってきました

## SharedElemntを使わなかった話
TransisionFrameworkなるものの一部がSharedElement

### 画面遷移のパターン
Fragment to Fragment
→Googleのサンプルコードはこれ．逆に言えばこれのサンプルコードは公式で存在する

setRenderingAllowedを有効にする

Activity to Activity

### どんな問題が起きるのか？
重なってるViewがあるとやばいw（Activity同士だと）

RecyclerViewでスクロールできて，それを遷移先でもスクロールできるようにすると，戻ったときに正しくアニメーションが実行しない
→戻るところでは来たときのアニメーションをただ逆再生しているだけらしい・・・

Xperiaでは動かない・・・？？？

