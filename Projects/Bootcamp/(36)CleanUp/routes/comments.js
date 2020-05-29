var express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require("../models/campgrounds"),
    Comment = require("../models/comment");

// ==================
// COMMENTS ROUTES
// ==================


// New Comments
router.get('/new', isLoggedIn, function(req, res) {
    // Fidn campground By Id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {
                campground: campground
            });
        }
    });
});

// Create Comments
router.post('/', isLoggedIn, function(req, res) {
    // Lookup Campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            redirect('/campgrounds');
        } else {
            // Create the new Comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // Add Username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save the Comment
                    comment.save();
                    // Connect new Comment to Campground
                    campground.comments.push(comment);
                    campground.save();
                    // Redirect Campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
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