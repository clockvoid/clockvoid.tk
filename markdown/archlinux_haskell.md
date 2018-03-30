# Arch LinuxでHaskellを扱うときに気をつけているとこ

<p class="date">2018-03-29</p>

最近良くArch LinuxのHaskell系パッケージに悩まされることがあるので，その問題点と問題点の解決策について，私なりに少しだけまとめてみようと思います．

俄なのでおかしい部分等あるかと思いますが，その際にはTwitterまでご一報くださるとありがたいです．

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

ただし，`haskell-ide-engine`など，`cabal-install`を依存パッケージとして指定しているパッケージもありますので，注意が必要です．

## stackの依存関係多すぎ問題&複雑すぎ問題
おそらく，Stackがインストールされている皆さんのArch Linuxマシンは`yaourt -Qs haskell-`すると対象のパッケージが表示されるはずです．

これらの依存パッケージは大量の容量を持っていっている上に，互いに依存しあっているので，蜘蛛の巣のように複雑な依存関係を生んでしまっています．

これを解決するには，`stack-bin`パッケージを使用します．`stack-bin`は，静的リンクされたバイナリをインストールするので，依存関係を消し去ることができます．

## ghc-modのバージョン問題
ghc-modは今の所，GHC-8.2.2では[動きません](https://github.com/DanielG/ghc-mod/pull/911)．

このプルリクエストを見る限り，そのうち対応すると思いますが，ただ先は長そうです．

そこで，私はstackの`global-project`に`lts-9.1`などのGHC-8.0.2時代のものを指定し，ghc-modをstackでインストールして，各プロジェクトの`lts`バージョンもそちらに合わせています．
これを行うことで，各プロジェクトでもghc-modは正常に動く上に，stackプロジェクト以外の開発でもghc-modが動いてくれます．

また，`neco-ghc`を使う場合には，コードを編集して`g:necoghc_use_stack`が1の状態で，`g:ghc_mod_path`を以下のようにします．

```
let s:ghc_mod_path = ['stack', 'exec', '--stack-exe', 'ghc-mod', '--']
```

これをしないと，何故かstackプロジェクトでghc-modが正常に動かなくなります．

## まとめ
以上，私がやっていることを適当にまとめてみましたが，Arch LinuxのHaskell系パッケージは今後も激しい変化を遂げていくでしょう．

この状態がいつまで続くかはわかりませんが，とりあえず今のところはこの状態で運営すればディスク容量のロスも少く，快適なHaskellライフが手に入るのではないかと思います．がんばりましょう💪
