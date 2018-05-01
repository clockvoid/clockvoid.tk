# ReactをTypeScriptで入門してみる

<p class="date">2018-04-15</p>
<p class="date">最終更新:2018-04-26</p>

最近FRP，流行ってますよね．

RxJavaなどを触る手もありましたが，Reactやってみたいと思っていたので，ここで入門したいと思い，導入してみました．

ただ，私はJavaScript辛いので，TypeScriptでやりたいと思い，TypeScriptでチュートリアルを触ってみることにしました．

なお，最終的なコードを[GitHub](https://github.com/clockvoid/ReactTutorialOnTypeScript)
に上げました．よろしければご覧ください．コミットは多分，節目ごとにしているはずです．

## Installation
まずは，諸々のインストールから始めましょう．

TypeScriptでReactを書きたいので，Microsoftが提供している，
[TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)
を使います．まずは，公式のGitHubにもあるように，

```bash
npm install -g create-react-app
create-react-app my-app --scripts-version=react-scripts-ts
```

します．これにより，最新のバージョンのTypeScript，Reactのための`@types`，WebPack，などのツールに加えて，`tslint.json`，`tsconfig.json`などの推奨設定ファイルもインストールされた
アプリケーションである，`my-app`が作成されます．

消費するディスク容量としては，大体`300MB`くらいでした．依存パッケージが多いので，それなりにでかいです．

## 1 Overview
まずは，Reactの
[チュートリアルページ](https://reactjs.org/tutorial/tutorial.html)
にアクセスしましょう．なんか英語のページが出てきますが，日本語にする方法がわかりませんので，そのまま英語を読みましょう．

まず，Getting Startedから始めようとしますが，先程のインストールで何やら`App.tsx`などというファイルが標準で作成されており，`npm run start`するとこのページが表示されます．
したがって，`Square`，`Board`，`Game`を作成する前に，`index.tsx`で`import App from './App.tsx'`を削除して，`ReactDOM.reandar`で読み込まれるクラスを`Game`に変更しましょう．

これを行うと，`index.tsx`は以下のようになるはずです，

```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from "./Game";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Game />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

```
ここで，`*.tsx`について少しだけ触れておきます．私はにわかなのでよくわかっておりませんが，Reactでは元来，`*.jsx`というファイルにロジックと，それによって生成されるDOMをすべて書き込んでいる
ようです．なんだかこれについて少しキモいなどという議論があるようですが，確かに今までのMV*には従っていないような気分にもなります．でも多分FRPに最適化されているのだろうと信じましょう．

次に，チュートリアルにあるように，`Square`，`Board`，`Game`を実装します．ここで，それぞれのクラスはそれぞれファイルを分けて実装しましょう．
デフォルトでインストールされる`tslint.json`に`max-classes-per-file`が`1`で設定されているらしく，分けないと怒られます．

また，これはTypeScriptの話になりますが，`default`で`export`すると`import Hoge from './Hoge.ts'`とした場合に読み込まれ，`default`をつけなかった場合は，`import { Hoge } from './Hoge.ts'`
としないと読み込まれません．更に，おそらく標準の`tslint.json`にて，`namespace`に付き1つしか`default`をつけられないようですので，いくつか`export`したい場合は，後者の方法で読み込みます．

さて，`Square`，`Board`，`Game`ですが，はじめの実装では，`Square`の`props`に値を渡してボタンのテキストを変更するというものになっておりますので，`Square`の`props`となるインターフェースを
定義しましょう．（TypeScriptではReactで扱うもの全てに方がついています．`React.Component`はジェネリクスで`<p, s>`を取ることになっており，`p`は`props`，`s`は`state`の意です．
これらに，それぞれユーザが定義したインターフェース（もしくは`{}`，つまり`Object`）を指定します．
`props`はReactコンポーネントの呼び出し時に指定されるオブジェクトの型（HTMLのプロパティです），
`state`は状態を示し，大抵は各コンポーネントのコンストラクタで初期化されます．初期化はオブジェクトリテラルを用いて行われます．
詳細は，
[TypeScript and React](https://charleslbryant.gitbooks.io/hello-react-and-typescript/content/TypeScriptAndReact.html)
にかかれています．）

つまり，ここまでで，コードは，

```typescript
interface ISquareProps {
  value: number;
}
class Square extends React.Component<ISquareProps> {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

などという形になります．

次のインタラクティブ化の部分では，ボタンが押されたときに`X`がボタンのテキストに指定されるようにしたいので，`state`を利用する必要があります．

ということは，`ISquareState`を以下のように定義し，あとは先程のジェネリクスの`s`の部分に指定するだけで，それ以外はチュートリアルのコードそのままでOKです．

```TypeScript
interface ISquareState {
  value: string | null;
}
```

ただし，チュートリアルのコードではコンストラクタの引数である，`props`の型を指定していませんが，これは当然のことながら，`ISquareProps`になります．

これでOverviewを終えることができました！型について考えながら進めることができたので，JavaScriptで普通にチュートリアルを書き写すよりかは理解が深いのではないでしょうか．

## 2 Lifting State Up
さて，インタラクティブ化もうまく行ったので，続いては状態の管理をなるだけ上流に持っていくことを考えます．
状態は一箇所に集めるべきですが，今のところはUIの上の階層をつくている部分に集めるべきです．したがって，少しずつ上に上げていかなくてはなりません．

そこで，ここでは`Square`にあった状態を`Board`にあげてみましょう．

まず，`ISquareState`はもう使いませんので，消して，代わりに

```typescript
type SquareValueType = string | null;
```

として新しい型を作ります．これがボタンテキストとして表示されますので，これを`ISquareProps`の`value`の型として指定します．次に，`Square`コンポーネントはボタンのように，
`onClick`プロパティを持っていなれば，`button`コンポーネントの`onClick`動作を決定することができませんので，それの型も指定しておきましょう．

ここまでの変更を適用すると，`Square`は以下のようになります．

```typescript
export type SquareValueType = string | null;

interface ISquareProps {
  value: SquareValueType;
  onClick: () => void;
}

class Square extends React.Component<ISquareProps, {}> {
  public render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}
```

続いて，`Board`もリファクタしましょう．`Board`はプロパティを持っている必要はありませんので，これは`{}`でよく，状態はそれぞれの`Square`の中に入っているものを保持する必要がありますので，

```typescript
interface IBoardState {
  squares: SquareValueType[];
}
```
とする必要があります．

続いて，`handleClick`を実装し，これを`Square#onClick`に指定する必要があります．しかしながら，`handleClick`はチュートリアルどおりに作ると，`(i: number) => void`型となり，
先程指定した`ISquareProps#onClick`の型と一致しません．そこで，`onClick={() => handleClick(i)}`とラムダ式を指定して，回避する方法を思いつきますが，
何故かJSXのアトリビュートでラムダ式を使うななどというエラーメッセージが入り（パフォーマンスが落ちるかららしい），コンパイルが通りませんでした．
そこで，強硬策として，`i`を受け取って，`handleClick(i)`を実行する関数を返す関数を作成しました．
（内部の処理がどうなってるのかはわかりませんが，あたかもカリー化されているかのように記述できます．TypeScriptすごい．）

```typescript
public createOnClick: (i: number) => () => void = (i: number) => {
  return (() => {
    this.handleClick(i);
  });
}
```

なんだか最低の気分ですが，こうしなければ動かないので仕方ありません．とりあえず，これでインタラクティブ化したコードで状態を上げることに成功しました．今後もこのような要領で状態を上げます．

続きはまた今度追記します（2018-04-15）

追記（2018-04-24）

### Functional Components
Reactには，Functional Componentsと呼ばれる素晴らしい仕組みがあります．状態を持たなくなったコンポーネントはわざわざクラスとして記述する必要はなく，普通に`function`と書いて，オブジェクトを作ればいいだろうというものです．
ここでは，Squareクラスがもう必要ありませんので，これをFunctional Componentsにしてしまいましょう．

```typescript
const Square: React.SFC<ISquareProps> = (props: ISquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Squareクラスをこの関数に置き換えてしまえばOKです．この関数の型は`React.SFC`と呼ばれるものです．これを使うことの利点は，コンポーネントを使用した際にIDEが入力保管をしてくれるという点と，`defaultProps`メンバに連想配列を代入することで，デフォルト引数を指定できる点にあります．この方については，[この記事](https://medium.com/@iktakahiro/react-stateless-functional-component-with-typescript-ce5043466011)
にて詳しく取り扱われています

### Taking Turns
この章については，JavaScriptのままやればOKです．ただし，`xIsNext`を`IBoardState`に追加するのを忘れないようにしましょう．

### Decularing a Winner
この章でも引き続きそのままやりましょう．ただし，`calculateWinner()`関数の最後のループはもっと単純なものを使えと言われるので，`forEach`にして単純化しましょう．（そもそもなんでチュートリアルのコードこうなってるの・・・Facebookさん！）

## 3 Storing A History
履歴を作れるようにしてみましょう．
履歴を作るためには，`IHistroy`というデータ構造を以下のように指定して，ターンを追うごとに配列の要素を増やしていくというアプローチを撮っています．

```typescript
interface IHistory {
  squares: SquareValueType[];
}
```

これを宣言したら，`Game`コンポーネントに状態をすべて管理させるようにしましょう．以下のようにして，`IGameState`を宣言して，あとはチュートリアルのとおりに状態を`Game`コンポーネントに上げていきます．

```typescript
interface IGameState {
  history: IHistory[];
  xIsNext: boolean;
}
```

これで見た目は何も変わりませんが，とりあえず履歴を記録する仕組みを作ることができました！

### Showing the Moves
とりあえずチュートリアルのとおりに実装します．`jumpTo`メソッドを実装していいないので，コンパイルが通らなくなります．

### Implementing Time Travel
これも普通にチュートリアルどおり実装するだけで大丈夫でした．

## 最後に
TypeScriptを使って型から見るRact入門ができたのではないでしょうか．

型があるとないとでは，理解の度合いも違いますし，Reactなどは特に関数型チックな仕組みが大量に備わっているのに型をつけないでやるのはもったいないような気もします．

今回のチュートリアルではReactのエッセンスを使ってマルバツゲームを作りましたが，なんだか`Game`に責任が集約しすぎていて，これでいいのかよくわかりません．

多分，今後Reduxが出てきたときにその謎が解けるのだろうと期待しましょう💪
