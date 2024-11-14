var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer = require('multer');
// 配置内存存储
const upload = multer({ storage: multer.memoryStorage() });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.json()); // 解析 JSON 格式的请求正文
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码格式的请求正文

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;
  const reqObj = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  }
  res.json(reqObj);
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
