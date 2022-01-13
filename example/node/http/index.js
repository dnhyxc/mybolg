const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {});

server.listen(8090, () => {
  console.log("服务器已经启动~~~");
});
