var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

// Schema Set-Up
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Salmon Creek",
//     image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
//     description: "This is a hige Granite Hill, with no bathrooms, no water. Beautiful Granite!"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Newly Created Campground");
//         console.log(campground);
//     }
// })


app.get("/", function(req, res) {
    res.render("landing");
})

// INDEX- Show all Campgrounds
app.get("/campgrounds", function(req, res) {

    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    })
})

// CREATE- Add new Campground to the Db
app.post("/campgrounds", function(req, res) {
    // Get data from the form and add it to Campgrounds Array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    // Create a new Campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

// NEW- Show form to create new Campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

// We need to make sure that this route is posted after campgrounds/new
// Otherwise there will be a clash of Routes

// SHOW- Shows more info about the selected Campground
app.get("/campgrounds/:id", function(req, res) {

    // Find the Campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                campground: foundCampground
            });
        }
    })
})

var port = 3000 || process.env.PORT;
app.listen(port, function() {
    console.log("Hurray, the Server got started!");
})