var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {

    if(req.url === "/"){
        //asynchronous
        // fs.readFile('home.html', function (error, data){
        //     res.writeHead(200, {'content-type' : 'text/html'});
        //     res.write(data);
        //     res.end();
        // });

        //synchronous
        var data = fs.readFileSync('home.html');
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write(data);
        res.end();
    }

});

server.listen(8080);
console.log("successful");