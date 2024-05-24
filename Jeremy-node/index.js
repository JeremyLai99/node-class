
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);

//引入express
import express from "express";
// 引入Multer
import multer from "multer";



// 建立wev server物件
const app = express();
// 建立multer物件
const upload = multer({dest: "tmp_uploads/"});


// 註冊樣板引擎
app.set("view engine", "ejs"); //view engine是預設的,最好採用

// 想自己設定views路徑的話
// app.set("views", "我的路徑/views");



// 將 body-parser 設定成頂層 middleware
// parse application/x-www-form-urlencoded  只處理x-www-form-urlencoded格式
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());




// routes
// 設定路由, 只允許用 GET 拜訪
app.get('/', (req, res)=>{
  // res.send(`<h2>哈囉</h2>`); //send跟end不同, 用了send會預設好檔頭. 基礎演示
  res.render('home', {name: "Jeremy"}); // 演示EJS
});

app.get("/json-sales", (req, res) => {
  const sales = [
    {
      name: "Bill",
      age: 28,
      id: "A001",
    },
    {
      name: "Peter",
      age: 32,
      id: "A002",
    },
    {
      name: "Carl",
      age: 29,
      id: "A003",
    },
  ];
  res.render("json-sales", { sales });
});  // 演示JSON

app.get("/try-qs", (req, res) =>{
  res.json(req.query);
});  // 取得queryString資料

app.get("/try-post-form", (req, res) =>{
  res.render("try-post-form");
});  // 只能用get到達(在url上刷新)

// const urlencodedParser = express.urlencoded({extended: true});
// app.post("/try-post-form", urlencodedParser, (req, res) => {
//   res.json(req.body);
// });  
// extended這邊可設true或false, 都可達到效果, 差別只在使用哪邊的parser.true就是用qs lib的
// 這邊中間用的urlencodedParser就是上面const宣告的middleware(中介軟體)
// 只能用post到達(填表單送出)

// 將上面的parser改設到頂部
// app.post("/try-post-form",  (req, res) => {
//   res.json(req.body);
// }); 

// 演示try-post-foam檔案是否有對應的變數宣告
// app.post("/try-post-form", (req, res) => {
//   res.render("try-post-form", req.body);
// });  

// 演示postman測試(沒有實際做檔案)
app.post("/try-post", (req, res) => {
  res.json(req.body);
});  

//一個欄位上傳一個檔案
app.post("/try-upload", upload.single("avatar"), (req, res)=>{
  res.json({
    body: req.body,
    file: req.file,
  });
});



// 設定靜態內容資料夾 放在路由設定之後, 404設定之前
// 靜態內容是儲存在伺服器中的任何檔案，每次傳遞給使用者時都相同。 ex.純文字, css, js等
// 相當於在根目錄, 打url的時候不用打
app.use(express.static("public"));  
// 省略的寫法, 等同放在根目錄. 完整寫法是 app.use("/", express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
// "/bootstrap"是設定要放在哪個資料夾. "node_modules/bootstrap/dist"是bootstrap檔案來源資料夾, 將後者設定到前者




// 設定404頁面
// ************ 404要放在所有的路由設定之後
app.use((req, res) => {    // use 接受所有 HTTP 方法
  // res.type("text/plain");  // 沒寫這個, 就會預設是.html  (同'text/html')
  res.type("html");
  res.status(404);
  res.send("<h1>走錯路了</h1>");
  // res.type("text/plain").status(404).send("<h1>走錯路了</h1>");  // 可以合在一起寫
});

// server偵聽
const port = process.env.WEB_PORT || 3002;  // 如果有吃到WEB_PORT會是3001, 沒有的話就會是這邊預設的3002
app.listen(port, ()=>{
  console.log(`Server start: port ${port}`);
});