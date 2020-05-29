var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// This is the array, which will be having objects...
// Each object contains all the information about cities..
// For start, we can start with an image, name and weather...
// Later on, we will be incorporating this array with a Database..
var cities = [];

app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/cities", function(req, res) {
    res.render("cities", {
        cities: cities
    });
})

app.post("/cities", function(req, res) {
    // Gets the data from the form and add it to Cities Array
    // Re-direct to Cities Page
    res.redirect("/cities");
})

app.get("cities/new", function(req, res) {
    res.render("new");
})

var port = 3000 || process.env.PORT;
app.listen(port, function() {
    console.log("Hurray, the server got started successfully!");
})