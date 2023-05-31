const http = require("http");
http
  .createServer(function (req, res) {
    res.write("rashad");
    res.end();
  })
  .listen(8080);
