const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);
  res.end( "hello world");
});

server.listen(80, () => {
  console.log("服务器已经启动~~~, http://127.0.0.1");
});
