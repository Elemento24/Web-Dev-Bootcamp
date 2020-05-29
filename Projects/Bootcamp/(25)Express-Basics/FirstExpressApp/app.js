var express = require("express");
var app = express();

//======
//ROUTES
//======

// "/" => "Hi there!"
app.get("/", function (req, res) {
    res.send("Hi There!");
})

// "/bye" => "Goodbye!"
app.get("/bye", function (req, res) {
    res.send("Goodbye!");
})

// "/dog" => "Meow!"
app.get("/dog", function (req, res) {
    //This statement will print a message in the node log
    console.log("Someone made a request to /dog")
    res.send("Meow!");
})

//This is how we define pattern routes
app.get("/r/:subRedditName", function (req, res) {
    //req.params will give us the parameters assigned to the route variables.
    var subreddit = req.params.subRedditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
})

app.get("/r/:subRedditName/comments/:id/:title", function (req, res) {
    console.log(req.params);
    res.send("Welcome to the comments page!");
})

//Make sure to include the star path in the last, because there is a ...
//Order of routes that is followed...
//Defines a send request for all the routes except than those defined above
app.get("*", function (req, res) {
    res.send("You are a star!");
})

//Tell Express to listen for requests (start server)
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});