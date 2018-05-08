# CakePHPの認証についてまとめてみる

<p class="date">2018/05/08</p>

CakePHPの認証周りについてのメモです．基本的に，[CookBook](https://book.cakephp.org/3.0/ja/controllers/components/authentication.html)
のまとめっぽくなってると思います．完全に自分の勉強にためのまとめですので，おそらく誰の役にも立ちません．

## 認証の方法
ブラウザ上で行う認証といえば，
* フォーム認証
* Basic認証
* ダイジェスト認証（HTTP認証）

などがあると思います（HTTP認証はよく知りません．）
私は今回はフォーム認証を使いたいですが，幸いなことに`AuthComponent`はデフォルトで`FormAuthenticate`を使用するそうです．

## 認証ハンドラーの設定
認証ハンドラーは2つ以上指定することが可能で，設定した順番に上から試されるようです．
最終的に，うまく認証できたらそこで`break`するようになってるそうです．
基本的には，これらの設定を`initialize()`で行うことになります．例えば，

```php
public function initialize()
{
    parent::initialize();
    $this->loadComponent('Auth', [
        'authenticate' => [
            'Form' => [
                'fields' => ['username' => 'email', 'password' => 'passwd']
            ]
        ]
    ]);
}
```

のようにします．もちろん，`Auth`の他の設定キーは，`authenticate`とは分けて配列に追加していくことになります．

## ユーザーの認識とログイン
送られてきた認証情報を使ってユーザの認識をするためには手動で`$this->Auth->identify()`を呼ぶ必要があります．
その後，セッションにユーザ情報を保存するために，`$this->Auth->setUser()`を呼びます．
最終的には次のようなコードになります．（チュートリアルで作ったとおりですね．）

```php
public function login()
{
    if ($this->request->is('post')) {
        $user = $this->Auth->identify();
        if ($user) {
            $this->Auth->setUser($user);
            return $this->redirect($this->Auth->redirectUrl());
        } else {
            $this->Flash->error(__('Username or password is incorrect'));
        }
    }
}
```

なんか`setUser()`は渡されたユーザデータを持つユーザとしてログインセッションを作る能力しか有してないようです．

## リダイレクト
先程のプログラムを見ると，リダイレクトしてますが，これはクエリー文字列（URLの後ろについてる?redirect=なんとか的なやつです）に，`redirect`が設定されていたらそれを使い，
そうでなくて，さっきの設定キーに`loginRedirect`を設定していたらそれ，何もなかったら`/`にリダイレクトするそうです．

とりあえずこれで一通りログインはできそうですが，サインインの実装ができていません．

## サインイン
サインインは，`UsersTable`を作成し，それにあったデータをフォームで入力させて，`$this->Users->PathEntity($user, $this->request->getData())`して，その後`$this->Users->save()`するだけ
みたいです．とても簡単そうですが，多分いろいろ考えてやらないとセキュリティリスクを抱えることになります．でもコードをいかに示します．

```php
// in the UsersController
public function add() {
    $user = $this->Users->newEntity();
    if ($this->request->is('post')) { 
        // Prior to 3.4.0 $this->request->data() was used.
        $user = $this->Users->patchEntity($user, $this->request->getData());
        if ($this->Users->save($user)) {
            $this->Flash->success(__('The user has been saved.'));
            return $this->redirect(['action' => 'add']);
        }
        $this->Flash->error(__('Unable to add the user.'));
    }
    $this->set('user', $user);
}
```

上記のコードが動くのは，`UsersTable`をデータベースに合わせてしっかり作成し，それのとおりに情報を持ってくるフォームアプリケーションを記述したときのみになります．
