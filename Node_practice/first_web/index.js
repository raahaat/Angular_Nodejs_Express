var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res){
    if(req.url == "/"){

        let data = fs.readFileSync("home.html");
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write(data);
        res.end();
    }else if (req.url == "/about"){
        let data = fs.readFileSync("about.html");
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write(data);
        res.end();
    }else if (req.url == "/contact"){
        let data = fs.readFileSync("contact.html");
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write(data);
        res.end();
    }
})

server.listen(8080);
console.log('successful');