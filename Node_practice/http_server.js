var http=require('http');

var server = http.createServer(function (req, res) {

    if (req.url == "/") {
        res.writeHead(200, {'content-type': 'text/html'})
        res.write('<h2>This is the home page</h2>')
        res.end;

    } else if (req.url == "/contact") {
        res.writeHead(200, {'content-type': 'text/html'})
        res.write('<h1>This is the contact page</h1>')
        res.end;

    }
});

server.listen(5050);
console.log("successful");