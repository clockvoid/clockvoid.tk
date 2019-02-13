# DroidKaigi Rejectconに参加してきました．

<p class="date">2019/02/13</p>

今日はDeNAでDroidKaigiのRejectConがありましたので，まとめを書きます．

## Androidでマルチタスキング
実は中身はコルーチンの話だった・・・

はじめにAndroidでアプリ作るときにはUIスレッドを止めてはいけないとかそういう話があって，それを実現する方法としてCoroutineを紹介している．

### Coroutineをたくさん動かしてみる
たくさんCoroutineを動かしても，CPUの実コア数を超えてThreadは生成されない

Coroutineにとって，Threadとは，Threadにとって，CPUのようなものである

### Coroutineの解決する問題
その昔，AndroidでマルチスレッドスレにはHandlerThreadとAsyncTaskを使っていた
→ライフサイクル似合わせるのが難しい，Callback Hell

次に，RxJavaが出てきた．
→大げさ（？），そもそもStreamを扱うライブラリだったはず．

