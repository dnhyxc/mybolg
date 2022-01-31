const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'content-type': 'text/html'
  })
  res.write('<div>hello world</div>')
  res.end();
});

server.listen(80, () => {
  console.log("服务器已经启动~~~, http://127.0.0.1");
});
