var express = require('express');
var bodyParser  = require('body-parser');
app=express();

app.use(bodyParser.json());
app.post('/', function (req, res){
    let jsonData = req.body;
    var name = jsonData['name'];
    var address = jsonData['address']

    res.send(name + "  " + address);

})

app.listen(8000, function (){
    console.log('successful');
})