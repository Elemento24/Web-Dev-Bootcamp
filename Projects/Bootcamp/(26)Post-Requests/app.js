var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

var friends = ["Tony", "Steve", "Charlie", "Lily", "Alan"];

app.get("/", function (req, res) {
    res.render("home");
})

app.post("/addfriend", function (req, res) {
    //Gives us access to all the data, given by the form
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
})

app.get("/friends", function (req, res) {
    res.render("friends", {
        friends: friends
    });
})

var port = 3000 || process.env.PORT;
app.listen(port, function () {
    console.log("Hurray, the server got started!");
})