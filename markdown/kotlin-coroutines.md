# KotlinのCoroutines
<p class="date">2018-03-07</p>

先日，Kotlin 1.2.30が[発表されました](https://blog.jetbrains.com/kotlin/2018/03/kotlin-1-2-30-is-out/)．この発表の中で，`suspend`という，`suspend`修飾子がついた関数をラムダ式を用いて定義できるような関数が追加されました．素晴らしいことです．

しかしながら，私はKotlinの，ひいてはどのようなCoroutinesについての知識もなかったので，ここで改めてまとめてみたいと思います．

## Coroutinesとはそもそも何なのか
Coroutineとは何なんでしょうか．Coroutineは，日本語では「こるーちん」と読みます（多分）．私がKotlinのDocumentationを読んだ限りではそれは，ノンブロッキングな非同期の処理を[Job](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/-job/index.html)としていくつか作成し，それぞれを非同期的に実行できるようにするためのContextであると考えられます．

このようなContextの良さは，それぞれのJobが非同期に実行されることがわかっているため，この部分に複雑な副作用をもたせてしまった場合に，どこが原因でバグが起こっているのか把握しやすいことはもちろんのこと，これを用いることで，ノンブロッキングな非同期処理を作ることができる点です．普通ならば，新たなスレッドを作成し，その実行が終わるまで親スレッドでは`Thread.sleep()`を用いて子スレッドの終了を待つはずですが，これにはいくつかの問題点があることはすぐにわかるとおりです．そこで，ノンブロッキングな方法を用いて（原文では，in a non-blocking way），子スレッドの終了を待つ必要があります．これを可能にするのが，`Job.join()`です．先程行ったとおり，`Job`はCoroutineで作成される実行単位ですが，これが提供する機能を使うことで，簡単に非同期処理をノンブロッキングなものにできました．👏

ただし，Coroutineは先程も言った通り，Contextですので，すべての処理は`suspend`修飾子がついた処理でなくてはならず，Haskellのモナドのようになってなくてはなりません．Haskellでは`main`関数がIOモナドを返すので都合が良かったですが，Kotlinでは`main()`はCoroutineではありません．そのへんの問題を解消し，サポートしてくれる機能を次の章で見ていきます．

## `runBlocking()`関数
`main()`の中身をCoroutineなScopeにしたい場合は，以下のように`runBlocking<T>(CoroutineContext, suspend () -> T)`を用います．

```kotlin
fun main(args: Array<String>) = runBlocking {
    // do somethig to use Coroutines...
}
```

この方法なら，`main()`に入った瞬間にCoroutine Scopeが始まりますので，いちいち関数内でCoroutine Scopeを作成する必要がなく，嬉しいです．また，`<T>`は`Unit`として解決されるので，`main()`の場合は省略可能です．更に，これを用いれば以下のような，スレッドセーフな挙動を目標とする単体テストを作成するのも簡単にできます

```kotlin
class MyTest {
    @Test
    fun testMySuspendingFunction() = runBlocking<Unit> {
        // here we can use suspending functions using any assertion style that we like
    }
}
```

これは素晴らしいです．これを用いれば，スレッドセーフかどうかのテストは簡単にできそうですね．

## まとめ
ここでは，簡単にKotlinのCoroutineを見てみました．この機能はまだExprimentalで，正式版ではありません．したがって，Kotlinコミュニティに参加できるチャンスでもあると思います．私もいろいろなプロジェクトにこの機能を活用したいと思います．

また，さらなる情報は，[coroutines-guide.md](https://github.com/Kotlin/kotlinx.coroutines/blob/master/coroutines-guide.md#composing-suspending-functions)や，[Documentation of Coroutines](https://kotlinlang.org/docs/reference/coroutines.html)にありますので，こちらをご参照いただければと思います．実は実行のキャンセルなど，現実は更に複雑なようです．．．
