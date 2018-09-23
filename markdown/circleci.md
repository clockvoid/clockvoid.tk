# CircleCIが難しすぎて積んだ話

<p class="date">2018/09/23</p>

CircleCIって難しすぎませんか？
みなさんもそう思っていますよね！この記事は，そんなみなさんに私の経験した辛い話を紹介して共有しようという話です．

## 背景
私の所属するサークルでは，[サークルのWebページ](https://oskt.us) を部員が作成しており，CircleCIでテストとデプロイを自動化しています．
今までは，CircleCI 1.0に準拠て`circle.yml`を記述していましたが，今回，これをCircleCI 2.0に準拠するように書き換えるということで，その作業を私が担当させていただきました．
その際の苦労と，詰まったところ，また，得たことをこの記事では紹介します．

## 前提
まず，前提として，もとの `circle.yml` では，CircleCIの機能でテストを走らせ，その後に，ブランチが`master`だったら`ci.sh`というデプロイ用のシェルスクリプトを走らせてデプロイする，という仕組みになっていました．このとき，`ci.sh`の中で，環境変数で設定したリポジトリ名などを用いるために`circle.yml`で環境変数を設定していました．ここで，このときの`circle.yml`を示します．

````yml
# circle.yml
machine:
  timezone: UTC
  node:
    version: 7.6.0
  environment:
    PATH: "${PATH}:${HOME}/${CIRCLE_PROJECT_REPONAME}/node_modules/.bin"
    GIT_REPO: "git@github.com:TUS-OSK/oskt.us.git"
    GIT_NAME: "CircleCI"
    GIT_EMAIL: "pnlybubbles+circleci@gmail.com"

deployment:
  production:
    branch: master
    commands:
      - sh -x ./task/ci.sh

general:
  branches:
    ignore:
      - gh-pages
````

これは普通のCircleCI 1.0の設定ファイルですね．
今回はこれをCircleCI 2.0対応させます．

## まずはじめにやったこと
まずは，当然のことながら，`circle.yml`を`.circleci/config.yml`に移し替えました．CircleCI 2.0では，設定ファイルの場所すら変わっており，ここに移さないと動きません．
続いて，とりあえず`workflow`とか言うものが理解できなかったので，`jobs`に`build`を作って，自動的に1つのWorkflowを認識するやつを使って，以下のような設定を書きました．

```yml
# .circleci/config.yml
version: 2 # use CircleCI 2.0
jobs:
  build:
    working_directory: ~/work
    docker:
      - image: node:7.6.0
    steps:
      - checkout
      - run:
        name: setup-environment-valuable
        command: |
          echo 'export PATH="./node_modules/bin:$PATH"' >> ~/.bashrc
          echo 'export GIT_REPO="git@github.com:TUS-OSK/oskt.us.git"' >> ~/.bashrc
          echo 'export GIT_NAME="CircleCI"' >> ~/.bashrc
          echo 'export GIT_EMAIL="pnlybubbles+circleci@gmail.com"' >> ~/.bashrc
      - run:
        name: reload-bashrc
        command: source ~/.bashrc
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run:
        name: install-npm_wee
        command: npm install
      - run:
          name: run-test
          command: npm test
      - run:
          name: deploy-gh-pages
          command: bash -x ./tasks/ci.sh
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}
          paths:
            - ./node_modules
```

これでとりあえずCIは回ります．しかし，大きな問題として，デプロイは`master`だけでやりたいのに，これではすべてのブランチで実行されてしまい，バージョンダウンが起こってしまうかもしれません．
そもそも，これでは今までの動きをしてくれませんよね．では，CircleCI 2.0での`filters`を記述しなくてはならないでしょう．しかし，ここが鬼門だったのです．

（ここで，環境変数を`environment:`を使わずに`.bashrc`で設定していますが，これは，`$PATH`の設定のように，他の環境変数を中で展開したい場合に，CircleCI 2.0の`environment:`はうまく対応してくれません．そこで，今回はとりあえず全部`.bashrc`に記述して再読込する，という方式を取りました．多分本当は`$PATH`だけこの方法で記述してそれ以外は`environment:`を使うとかのほうがいいです．）

## CircleCI 2.0で特定branchでビルド
**意味不明でした．** まずは当然，[マニュアル](https://circleci.com/docs/2.0/configuration-reference/#branches)の通り，単一ジョブでのスキップを試みます．
この方法だと，全部の`run:`がスキップされてしまいそうです．そこで，よくわからないながらも，とりあえず，[ここ](https://circleci.com/docs/2.0/configuration-reference/#filters)をみて，[こんな感じ](https://circleci.com/gh/clockvoid/oskt.us/35#config/containers/0)にしてみました．しかし，当然ながらスルーされます．これは，書いている場所が違うのが問題です．ここで用いた設定ファイルをいかに示してみます．

```yml
version: 2
jobs:
  build:
    working_directory: ~/work
    docker:
    - image: node:7.6.0
    steps:
    - checkout
    - run:
        name: setup-environment-valuable
        command: |
          echo 'export PATH="./node_modules/bin:$PATH"' >> ~/.bashrc
          echo 'export GIT_REPO="git@github.com:TUS-OSK/oskt.us.git"' >> ~/.bashrc
          echo 'export GIT_NAME="CircleCI"' >> ~/.bashrc
          echo 'export GIT_EMAIL="pnlybubbles+circleci@gmail.com"' >> ~/.bashrc
    - run:
        name: reload-bashrc
        command: source ~/.bashrc
    - restore_cache:
        key: dependency-cache-{{ checksum "package.json" }}
    - run:
        name: install-npm-wee
        command: npm install
    - save_cache:
        key: dependency-cache-{{ checksum "package.json" }}
        paths:
        - ./node_modules
    - deploy:
        command: bash -x ./task/ci.sh
        fileters:
          branches:
            only: master
```

このように，Workflowを自分で設定せずに，`run:`の部分で`filters:`とか書けば行けるだろとか思ってました．でも **これは間違いです．** 
上で示した`filters`のCircleCIのDocumentationをよく見ると，これは，`workflows`の中で，あるジョブに対して行う設定となっています．したがって，`filtes`はここに書くのではなく，下に`workflows`を自分で設定して，その中に書くべきでした．

この反省を踏まえて最終的に出来上がったのが，以下の`.circleci/config.yml`です．

```yml
# .circleci/config.yml

references:
  commands:
    setup_environment_valuable: &setup_environment_valuable
      name: setup-environment-valuable
      command: |
        echo 'export PATH="./node_modules/bin:$PATH"' >> ~/.bashrc
        echo 'export GIT_REPO="git@github.com:TUS-OSK/oskt.us.git"' >> ~/.bashrc
        echo 'export GIT_NAME="CircleCI"' >> ~/.bashrc
        echo 'export GIT_EMAIL="pnlybubbles+circleci@gmail.com"' >> ~/.bashrc
        source ~/.bashrc
    install_npm_wee: &install_npm_wee
      name: install-npm-wee
      command: npm install
version: 2 # use CircleCI 2.0
jobs:
  npm_test:
    working_directory: ~/work
    docker:
      - image: node:7.6.0
    steps:
      - checkout
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run: *install_npm_wee
      - run:
          name: run-test
          command: npm test
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}
          paths:
            - ./node_modules
  deploy_gh_pages:
    working_directory: ~/work
    docker:
      - image: node:7.6.0
    steps:
      - checkout
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run: *setup_environment_valuable
      - run: *install_npm_wee
      - run:
          name: run-deployment
          command: bash -x ./task/ci.sh
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}
          paths:
            - ./node_modules
workflows:
  version: 2
  test-and-deploy:
    jobs:
      - npm_test:
          filters:
            branches:
              ignore: gh_pages
      - deploy_gh_pages:
          requires:
            - npm_test
          filters:
            branches:
              only: master
```

これを見るとわかるとおり， **CiecleCI 2.0では，とりあえず`jobs`を使って，ジョブの定義をいくつか行い，その後で，`workflows`でその作ったジョブたちをどのように実行するかを決めています．**
そもそも，この考えを理解したのがこの記事を書いている最中でした（殴）．ここで，`workflows`で作ったジョブたちに対して，`filters`をかけることで，特定ブランチで実行したりしなかったり，はたまたタグで分別したりといったことが可能です．スバラです．

また，本題とは外れますが，CircleCI 2.0では，`references`とか言うものが使えます．ここに再利用しそうなコマンドを書いておくと，実行するときに自動的に展開して実行してくれます．C言語で言うところのプリプロセッサ的なやつっぽいです．これもよく考えてみたら`setup_environment_valuable`はいらないですね．（複数回利用していないので．）

## 詰まったところまとめ
結局，今回は特定ブランチで走らせたり走らせなかったりといったところでつまりました．これは，CircleCI 2.0のWorkflowの考え方を理解すればすんなり記述できるようになるはずです．ここで，大切なのでもう一度Workflowについて書いておきましょう．

 **CiecleCI 2.0では，とりあえず`jobs`を使って，ジョブの定義をいくつか行い，その後で，`workflows`でその作ったジョブたちをどのように実行するかを決めています．**

 はい．このどのように実行するか，の部分で`filters`を記述すればよかったのですね．

 また，実は本文には登場しませんでしたが，今回，途中でプッシュしたのになぜかビルドが始まらないという現象に出会いました．実行されないのでエラーログも見れず，原因は結局わからずじまいでしたが，どうやら1.0のときの`circle.yml`をリポジトリに残していると実行されないことがあるっぽいです．でもそれ以前では実行されていたんですがね．謎です．

## 最後に
CircleCIは使いこなせれば全部自動化できる素晴らしいツールだと思います（なんか利用料金とか諸々ケチ臭いですが．）．今回試行錯誤の中でたくさんのことを学べました．今後もAndroidアプリのビルド，デプロイの自動化など，様々なことに使えるように精進します！

なお，このブログ記事に対する誤り報告や，もっとこうしたほうが良い！ということなどありましたら，[@clock_void](https://twitter.com/clock_void)までよろしくお願いいたします．喜びます．
