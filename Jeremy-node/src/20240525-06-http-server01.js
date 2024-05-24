import http from "node:http";
// http 形式參數. 後面的http是node內建的套件, 寫node:只是為了標示清楚

const server = http.createServer((req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse
  res.writeHead(200, 
    // 200 是'正常回應'的代碼
    {"Content-Type": "text/html; charset=utf-8",}
    // 設定'檔頭'的格式, 並需要特別設定是utf-8否則預設是big-5
  ); 
  res.end(`<h2>泥好嗎?</h2>
  <p>${req.url}</p>`);  //只是示範一下功能而已
});

server.listen(3000);
// 3000是node習慣用的通訊埠


// 終端機執行後去瀏覽器打localhost:3000  (3000看上面通訊埠設定多少) 閱覽
// 如果有做新的修改, 需要先ctrl+c停掉後再重新執行一次瀏覽器上才會看到更新的
