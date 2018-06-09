# XorgとVirtualBoxの奇妙な関係

<p class="date">2018年5月22日</p>

この間（5月17日くらい？）にArch Linuxで`xorg-server`のアップデートをして，バージョン1.20にしたところ，VirtualBoxのGuest Additionが提供する3Dアクセラレーションのドライバ，`vboxvideo`がXorgに読み込まれなくなってしまい，悪戦苦闘して直したので，その経過の記録をとっておきます．

## `virtualbox-guest-dkms`
はじめに，最近`virtualbox-guest-dkms`をアップデートすると，Error!という文字を見るようになったので，何かがおかしいのかと思っていました．
そのような状況下で今回の3Dアクセラレーション事件が起こったので，まずはじめに疑ったのは何を隠そう，`virtualbox-guest-dkms`のバグです．
最新のカーネルにすると再現するようでしたので，まずはカーネルのバージョンを下げてみることにしました．そこで，`lts`カーネルであれば多分古いので，

```bash
yaourt -S linux-lts linux-lts-headers
```

しました．すると，インストールの途中で，`vboxsf-4.16`はこのカーネル用ではないのでビルドしませんとか言うメッセージがエラーとして出てきました．
実はこれにずっと頭を悩ませていたのですが，それもそのはず，このモジュールはLinux kernel 4.16系のためのものなので，今回インストールした`4.14.41-lts`にはマッチするはずもありません．

ここでこの状況が全くわからない私のような読者のために，`virtualbox-guest-dkms`がどのようなことになっているのか，まとめてみましょう．

### （付録）`virtualbox-guest-dkms`の現状
まず前提として，前までは必要だった，クリップボード共有やオートマウントのためのカーネルモジュールがどうやらLinux kernel 4.16からはカーネルに予め含まれているらしいです．
したがって，4.16では`vboxguest`のビルドをする必要がありません．そういう意味で，`dkms`はError!とか言ってたんですね．分かりづらい．

でも，古いカーネルではビルドが必要ですので，昔ながらのカーネルモジュールのビルドスクリプトは残っており，当然これを使って，`4.14.41-lts`では`vboxguest`などをビルドします．
しかし，新しいカーネル用の少なくなったモジュールはこのバージョンのカーネルには必要ありません．だから`vboxsf-4.16`はビルドする必要はなく，そういう意味でまたまたError!と言っていたのですね．分かりづらい．

実はこの状況は[`virtualbox-guest-dkms`](https://www.archlinux.jp/packages/community/x86_64/virtualbox-guest-dkms/)
でView Sourceすると書いてあるので簡単にわかります．

上記のようなこともあり，無事に`virtualbox-guest-dkms`は正常であることがわかりました．
（Tips:ただし，完全に正常というわけではありません．何故か`4.16.9`のカーネルでVirtualBoxの機能のファイル共有をして，その共有したディレクトリに`maim`でスクリーンショットを記録すると大きい画像だとバグってうまく表示できない画像が吐かれます．`maim`か`vboxsf-4.16`のバグです．しばらくは`lts`カーネルを使うようにしましょう．）

（2018-06-09追記）:どうやら上で書いたマウント関連の不具合は[解決されたよう](https://git.archlinux.org/svntogit/community.git/commit/trunk?h=packages/virtualbox&id=67ef75c9673d9a58a81db41a790dd30635971785)
です．これで`lts`パッケージを使い続けずに済みます．

## Xorg
結局，多分不具合はXorgのせいだとわかりました．普通にはじめからそうすればいいとか思いますが，`xorg.0.log`を確認すると，

```
[  1883.713] (II) LoadModule: "vboxvideo"
[  1883.713] (WW) Warning, couldn't open module vboxvideo
[  1883.713] (II) UnloadModule: "vboxvideo"
[  1883.713] (II) Unloading vboxvideo
[  1883.713] (EE) Failed to load module "vboxvideo" (module does not exist, 0)
```

などと書いてあります．なるほど，読み込めないのですね．( ᐛ👐)パァ

このエラーについていろいろと検索すると，[こんな](https://forums.virtualbox.org/viewtopic.php?f=3&t=84652#p402321)
投稿が出てきました．ちょっと古いですが，おそらく今回も似たような問題が起こっているのでしょう．最新のソフトウェア同士が噛み合わないのはよくあることです．

## 解決策
最終的には，Xorgをダウングレードすれば解決することがわかりました．

ただし，私は一つ大きなミスを犯していました．`yaourt -Scc`してしまっていたのです．最高に馬鹿だとお思いでしょう？そうです，馬鹿なんです(´ . .̫ . \`)
まぁ，たまにはこんなこともあるかと思います．今回はディスクの容量が致命的に足りなかったのが原因ですし，どんな人でもミスはするでしょう．
ここでは，このような場合でもうまく復旧する方法を記述します．

と言っても内容は簡単です．[xorg-server 1.20.0-2](https://www.archlinux.org/packages/extra/x86_64/xorg-server/)
みたいなページに行くと，右の方にView Changesなるリンクがあるかと思います．そこで適当なタイミングのコミットを選択すると，
[このようなページ](https://git.archlinux.org/svntogit/packages.git/commit/trunk?h=packages/xorg-server&id=d12bc9dda2ac15052c74b51eca1199a3b3a37693)
に飛ばされます．このページでdownloadのところにある`tar.gz`をダウンロードして展開し，展開したディレクトリをカレントディレクトリとしたら，

```bash
cd trunk
makepkg
yaourt -U xorg-server-(xxx) xorg-server-common-(xxx)
```

のようにしてインストールします．途中，必要な依存パッケージが足りないなど出ますが，適切にインストールします．また，(xxx)とした部分にはバージョン名が入ります．適当に生成されたパッケージを見て入力します．

## まとめ
今回得た教示としては，

* 一番最後に更新されたパッケージを疑う
* logを見る
* `yaourt -Scc`してはならない

くらいのことでした．みなさんもこの問題にはくれぐれもお気をつけをば．

それでは．
