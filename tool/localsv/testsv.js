/**
 * テスト用サーバー起動スクリプト
 * `node testsv.js` でテスト用サーバーが起動します
 * `http://localhost:3000/index.html` で表示できます
 * `cmd + c` でテスト用サーバーを終了します
 */

var express = require('express');
var server = express();

// `./` 以下を公開
server.use(express.static("../../dist/"));

// 3000ポートを監視
var port = 3000;
server.listen(port, null);