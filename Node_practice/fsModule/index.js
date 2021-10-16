var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res){
    if(req.url == "/"){
        fs.writeFile('demo.txt', "hello rahat", function (error){
            if (error){
                res.writeHead(200, {'content-type' : 'text/html'});
                res.write("File write error.");
                res.end();
            }else{
                res.writeHead(200, {'content-type' : 'text/html'});
                res.write("File write successful.");
                res.end();
            }
        })
    }

})
server.listen(8080);
console.log("successful");