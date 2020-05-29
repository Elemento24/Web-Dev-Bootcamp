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

// Middleware Function
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;