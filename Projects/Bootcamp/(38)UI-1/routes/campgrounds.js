var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"), // If we just require a directory, then by default index.js is required...
    Campground = require("../models/campgrounds");

// ======================
// CAMPGROUND ROUTES
// ======================

// INDEX- Show all Campgrounds
router.get('/', function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {
                campgrounds: allCampgrounds
            });
        }
    });
});

// CREATE- Add new Campground to the Db
router.post('/', middleware.isLoggedIn, function(req, res) {
    // Get data from the form and add it to Campgrounds Array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name,
        image: image,
        description: desc,
        author: author
    };
    // Create a new Campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW- Show form to create new Campground
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// We need to make sure that this route is posted after campgrounds/new
// Otherwise there will be a clash of Routes

// SHOW- Shows more info about the selected Campground
router.get('/:id', function(req, res) {
    // Find the Campground with the provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
            // req.flash("error", "Sorry, that Campground doesn't exist!");
            // return res.redirect("/campgrounds");
        } else {
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});

// EDIT - Edit a particular campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {
            campground: foundCampground
                // campground: req.campground
        });
    });
});

// UPDATE - Update a particular campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // Find & Update the correct Campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // Redirect Somewhere (Show Page)
});

// DESTROY - Destroys the Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

module.exports = router;