# Arch Linuxでやってきたこと

![Arch Linux](https://i.imgur.com/qccLluT.png)

## インストール
* 基本的にはArch Wikiの通り
* Boot Loaderは`Grub`を使った．
	* その関係で，パーティションは`boot`とは別に`esp`を作成．
	* フォーマットには`gdisk`を使った．

## Virtual Box関係
※私は仮想マシンでArch Linuxを運用している．
* Guest Modulesは`virtualbox-guest-dkms`を使用．→これは，`virtualbox-guest-modules`はなぜかカーネルアップデートのタイミングでアップデートされないため，歩調を合わせる必要があるが，それが難しいためである．

## X Window System関係
* Window Managerは`XMonad`を使用．
* キーボードの設定はWindowsに由来するらしく，X11のkeyconfを使っても`Caps Lock`と`Ctrl`が交換できなかったので，Windowsで行った．
* ステータスバーは`xmobar`を使用している．
* アイコントレイとして`trayer`を使用している．

## pacman関係
* パッケージマネージャは`yaourt`を導入
* 一応パッケージ圧縮で用いるアプリケーションを変更して高速化したことになっているが，その効果は不明（そもそも，私は`/tmp`をメインメモリではなく，HDDに展開されるようにしている．メモリが足りないので．）
	* `/etc/makepkg.conf`に`COMPRESSGZ=(pigz -c -f -n)`を書いた．（該当部分を変更）詳しくは→[yaourtのパッケージの圧縮を高速化](https://qiita.com/ponkotuy/items/a89c3021d1ec34dbb8d2)

## Vim関連
私は基本的にテキストエディタとして`Vim`を使用している．宗教的な意味はない．
* プラグインマネージャーは`dein.vim`を使用．
* 導入しているパッケージは`dotfiles`を参照．
* セッションの保存ができるようにした．

## Zsh関連
私はデフォルトのシェルとして`Zsh`を使用している．
* 特筆するべきことは何もしていない．基本的には`dotfiles`を参照．

## tmux関連
私はターミナルマルチプレクサとして`tmux`を使用している．
* `develop`で画面がIDEっぽくさん分割されるようにした．
* セッションの保存をして，再起動後に環境を元に戻す辛さを低減した．→それなりの`systemd`の`service`があり，これで自動で起動するようにしている

## PowerLine
パワーラインでかっこよくしている．
* PowerLineは`Zsh`と`tmux`で有効にしている．
* 設定はほとんど何も変えていない．
