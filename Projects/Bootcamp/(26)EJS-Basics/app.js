var express = require("express");
var app = express();

//This will tell Express to serve the contents of Pubic Directory
app.use(express.static("public"));
//This will tell Express that all of our templates will be ejs, unless stated otherwise
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/fellinlovewith/:thing", function (req, res) {
    var thing = req.params.thing;
    res.render("love", {
        thingVar: thing
    });
})

app.get("/posts", function (req, res) {
    var posts = [{
            title: "Post 1",
            author: "Susy"
        },
        {
            title: "My adorable pert bunny",
            author: "Colt"
        },
        {
            title: "Can you believe this pomsky",
            author: "Charlie"
        }
    ];
    res.render("posts", {
        posts: posts
    })
})

var port = 3000 || process.env.PORT;
app.listen(3000, function () {
    console.log("Hurray, the server got started!");
})