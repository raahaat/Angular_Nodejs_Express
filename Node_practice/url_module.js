var http = require('http');
var URL = require('url');

var server = http.createServer(function (req, res){

    var myUrl = "http://rabbil.com/blog.html?year=2020&month=july";
    var myUrlObj = URL.parse(myUrl, true);

    var myHostName = myUrlObj.host;
    var myPatName = myUrlObj.path;
    var mySearchName = myUrlObj.search;

    res.writeHead(200, {'content-type' : 'text/html'});
    res.write(mySearchName);
    res.end();
});

server.listen(5050);
console.log("success!");