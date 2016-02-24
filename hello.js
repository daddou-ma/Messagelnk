var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200);
	res.end("Welcome in nodeJS App");
}).listen(8080);

