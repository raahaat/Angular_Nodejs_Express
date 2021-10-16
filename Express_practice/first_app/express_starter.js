var express = require('express');

app = express();


//response simple string(get&post)
//res.send()/res.end()
app.get("/get", function (req, res){

    res.send('Simple string response')

})

app.post("/post", function (req, res){

    res.send('Simple string response');
})
//status code response
app.post("/status", function (req, res){

    res.status(404).end();
})
//json response
app.get("/json", function (req, res){
   let json = [
    {
        name : "Rahat",
        age : "25",
        occupation:"Engineer"
    },
    {
        name : "Anie",
        age : "25",
        occupation:"Statitician"
    }
   ]
   res.json(json);

})
//download response
app.get("/download", function (req, res){
    res.download("./uploads/n.jpg");
})
//response redirect
app.get("/bd", function (req, res){
    res.redirect("http://localhost:8000/ind");
})
app.get("/ind", function (req, res){
    res.send("this is india");
})

app.get("/yt", function (req,res){
    res.redirect("http://youtube.com");
})
//response header
app.get("/header", function (req, res){
    res.append("name", "Rahat");
    res.append("age" , "25");
    res.append("occupation", "Engineer");

    res.status(404).end("Hello Rahat!");
})
//response cookie
app.get("/cookie", function (req, res){
    res.cookie("name", "Rahat");
    res.cookie("age" , "25");
    res.cookie("occupation", "Engineer");

    res.status(404).end("cookies set successfully!");
})
//clear cookie
app.get("/clear_cookie", function (req, res){
    res.clearCookie("name");

    res.status(404).end("cookies cleared successfully!");
})


app.listen('8000', function (){

    console.log('application run successfully!');
})
