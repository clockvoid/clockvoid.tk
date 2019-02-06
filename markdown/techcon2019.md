# DeNA TechCon

## 全体的な書簡
基本的にはテストの話と品質管理の話を聞き，最後にCloudシフトについての話を聞いた

## テストの話
まず，持続可能なシステムを作るためには，リリース前の段階でプロトタイピングを行い，効率的に失敗することが重要である．
また，メンテナンス性が高いシステムを作るために，失敗が起こった瞬間にメンテナンスを行うなどの工夫や，仕様変更に対して自動的にそれを適用するようなオートメーションが必要．

テストについて，いちばん重要なのはテストの実行プロセスである．
このテストの実行プロセスは尖ったことはせず，基本的なことを淡々とこなすべき．TPI-NEXTが懸命．
テストの手法としては，まずは使用の明文化が必要であるが，日本語のままだとよくわからないため，真理値表であったり，状態遷移図であったりを書く必要がある．
真理値表を使うのか，状態遷移図を使うのかは慣れが必要である．基本的にはテストに強い人が近くにいて，ホワイトボードでイメージトレーニングをすることが重要．
テストに強い人がいなければ，テストコンテストに出ることが懸命である．
また，テストの設計にはテスト設計技法がデザインパターンとして整備されているため，それを使う．これについてはJaSST'2018 Kyusyuの基調講演を参考のこと．

更に，仕様の明文化に関しては，Promelaと呼ばれる仕様作成言語を使用するのが良いかもしれない．
状態遷移も，真理値もこれなら一つで拾えるはずである．

## CloudShiftについて
### GCP
どうもDeNAがCloudShiftをするきっかけとなったのはGCPの模様．
GCPではGAEとかKurbenetesなどの上位サービスを良く使っている模様．

あと，新しい製品の導入を上にするときは，システムの質の低下がないことや，コスト的なメリットが大きいことなどを中心にお話すると良い．

GAEはランタイムが制限されたWebアプリ用のプラットフォーム、Kubernetesはコンテナ化されたアプリケーションをデプロイできるプラットフォーム。
GCEはもはや普通のレンタルサーバだが、Storageなどはスケールできるやつを外付けできる
Googleは中国にデータセンター持ってないが、パートナーシップ契約してる会社がリソースを提供してくれる仕組みが存在する。

### AWS