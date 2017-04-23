# riot-proj使い方

## インストール方法
プロジェクトフォルダを任意の場所へコピー

```bash
$ ./install.sh
```

準備完了！

## 機能構成
* riot
    * tag
        * tag内でscssを使用可能(style type="scss"表記)
            * import使用不可
* jquery
* scss

## ディレクトリ構成
プロジェクトディレクトリ以下はこのようになっております。

* src/ (リソースフォルダですこちらをvsコードなどで開いて下さい)
    * index.html (トップページです)
    * style/ (cssとscssによる表記が可能です)
    * script/lib/ (これ以下のディレクトリはそのままの状態でdistにコピーされます)
    * tag/ (riotのtagを格納するためのディレクトリです。)

* tool/
    * build/ (ビルドスクリプトが格納してあります)
    * localsv/ (ローカルサーバを起動できます `$ ./start-testsv.sh`)
* dist/
    * script/bundle.js (lib以外のjsはすべてこちらに統合されます)

## ビルド方法
プロジェクトディレクトリをコマンドで開き

```bash
$ npm run build
```

でdist以下にプロジェクトをビルドします。