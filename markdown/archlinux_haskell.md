# Arch LinuxでHaskellを扱うときに気をつけているとこ

<p class="date">2018-03-29</p>

最近良くArch LinuxのHaskell系パッケージに悩まされることがあるので，その問題点と問題点の解決策について，私なりに少しだけまとめてみようと思います．

## よくある問題
まず，よくある問題を列挙して，それについて各セクションで見ていくことにします．
* Xmonadのバージョン問題
* cabal-installパッケージいらない問題
* stackの依存関係多すぎ&複雑すぎ問題
* ghc-modのバージョン問題（Arch Linuxに限らない）

## Xmonadのバージョン問題
Arch LinuxのXmonadはよく依存している`haskell-*`系のパッケージにおいて行かれ，しかも他のstackなどのツールはきちんと追随しているので，全くどうしようもなくなってしまうことがあります．

これは，例えばVirtualBox Guest Utilsと同じような課題で，他のパッケージのバージョンアップの都度，新しいバイナリをローカルで生成するよりほかはありません．
つまり，解決法としては，`xmonad-git`パッケージを使ったり，tarballからcabalを用いてインストールするなどの方法を用いるしかないということです．

私は，`xmonad-git`と`xmonad-contrib-git`を使っていますが，参考までに，tarballから最新版のXmonadをインストールするには，次のようにします:

```bash
cabal install https://github.com/xmonad/xmonad/archive/master.tar.gz
cabal install https://github.com/xmonad/xmonad-contrib/archive/master.tar.gz
```

このようにしてインストールしたXmonadが起動しなくなった場合などには，再びコンパイルし直して使います．
また，`xmobar`などを使っている場合には，同様にして`xmobar-git`を使用します．（たまにこちらのパッケージも壊れますので，自分で書いた`PKGBUILD`をメンテナンスしておくことをおすすめします．）

## cabal-installパッケージいらない問題
cabal-installパッケージは`cabal-install`のついた`cabal`をインストールしていくれますが，これは，Stackでインストールできる上に，StackでインストールしたほうがStackの`lts`を使ってバージョン管理できますので，必要ありません．次からインストールしないようにしましょう．

## stackの依存関係多すぎ問題&複雑すぎ問題
おそらく，Stackがインストールされている皆さんのArch Linuxマシンは`yaourt -Qs haskell-`すると対象のパッケージが表示されるはずです．

これらの依存パッケージは大量の容量を持っていっている
