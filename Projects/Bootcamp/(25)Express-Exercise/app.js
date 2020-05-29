var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("Hi there, welcome to my assignment!");
})

app.get("/speak/:animal", function (req, res) {
    //Defining a dictionary, instead of writing if-else ladder
    var sounds = {
        cow: "Moo",
        pig: "Oink",
        dog: "Woof Woof",
        lion: "Roar",
        crow: "Cau"
    }
    //To make sure that the paramenter is case-insensitive
    var animal = req.params.animal.toLowerCase();
    res.send("The " + animal + " says '" + sounds[animal] + "'.");
})

app.get("/repeat/:words/:num", function (req, res) {
    var word = req.params.words;
    var num = Number(req.params.num);
    var string = "";
    for (var i = 0; i < num; i++) {
        string += word + " ";
    }
    res.send(string);
})

app.get("*", function (req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
})

var port = 3000 || process.env.PORT;
app.listen(port, function () {
    console.log("Hurray, the server got started!");
})