var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [{
    name: "Salmon Creek",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
    name: "Granite Hill",
    image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
    name: "Mountain Goat's Rest",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
    name: "Granite Hill",
    image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
    name: "Mountain Goat's Rest",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
    name: "Granite Hill",
    image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
    name: "Mountain Goat's Rest",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
}
]

app.get("/", function (req, res) {
    res.render("landing");
})

app.get("/campgrounds", function (req, res) {
    
    res.render("campgrounds", {
        campgrounds: campgrounds
    });
})

app.post("/campgrounds", function (req, res) {
    // Get data from the form and add it to Campgrounds Array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground)
    // Re-direct Page to Campgrounds Page
    // Though we have 2 "/campgrounds", but when we do a re-direct, then the default is to redirect as a get request.
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new",function(req,res){
    res.render("new");
})

var port = 3000 || process.env.PORT;
app.listen(port, function () {
    console.log("Hurray, the Server got started!");
})