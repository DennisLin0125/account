var express = require('express');
var router = express.Router();

// 導入lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);

// 導入 shortid
const shortid = require('shortid');

// 記帳本列表
router.get('/account', function(req, res) {
  res.render("list");
});

// 添加紀錄
router.get('/account/create', function(req, res) {
  res.render("create");
});

// 新增紀錄
router.post('/account', function(req, res) {
  // 生成ID
  let id = shortid.generate();
  // 寫入文件
  db.get("accounts").unshift({id:id, ...req.body}).write();
  res.send("新增紀錄");
});

module.exports = router;
