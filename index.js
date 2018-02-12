var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");
var fs = require("fs");
   
var cartRoutes = require("./routes/cart")
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res){
    res.sendFile("index.html")
});

app.use("/api/cart", cartRoutes);

app.get("/api/products", function(req, res){
    var content = fs.readFileSync("product.json");
    var jsonContent = JSON.parse(content);
    res.json(jsonContent);
})


app.listen(port, process.env.IP, function(){
    console.log("App is running on PORT" + process.env.PORT);
})