var express = require("express"),
    router = express.Router(),
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
router.post('/', isLoggedIn, function(req, res) {
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
router.get('/new', isLoggedIn, function(req, res) {
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
        } else {
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});

// EDIT - Edit a particular campground
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {
            campground: foundCampground
        });
    });
});

// UPDATE - Update a particular campground
router.put("/:id", checkCampgroundOwnership, function(req, res) {
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
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

// Middleware Function
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// For the Authorisation of the LoggedIn User
function checkCampgroundOwnership(req, res, next) {
    // Is User Logged In At All
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                // Does User own the Campground
                // i.e. we need to compare foundCampground.author.id & req.user._id
                // However, the first one is a Mongoose Object & the second one is a String
                // But if we print them out, they will look the same
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

module.exports = router;