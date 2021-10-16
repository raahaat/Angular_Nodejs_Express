var express = require('express');

app = express();
//get request with url query
app.get("/query", function (req, res){
     let fname = req.query.fname;
     let lname = req.query.lname;

     res.end(fname + " " + lname);
})
//get request header
app.get("/header", function (req, res){
    let fname = req.header('fname');
    let lname = req.header('fname');

    res.end(fname + " " + lname);
})
//simple post req. with url query
app.post('/post_query', function (req, res){
    let fname = req.query.fname;
    let lname = req.query.lname;

    res.end(fname + " " + lname);
})




app.listen(8000, function (){
    console.log('successful');
})