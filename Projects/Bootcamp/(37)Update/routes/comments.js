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

// Edit Comments
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

// Update Comments
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy Comments
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
    // Find By Id & Remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
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

// For the Authorisation of the LoggedIn User
function checkCommentOwnership(req, res, next) {
    // Is User Logged In At All
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // Does User own the Comment
                // i.e. we need to compare foundComment.author.id & req.user._id
                // However, the first one is a Mongoose Object & the second one is a String
                // But if we print them out, they will look the same
                if (foundComment.author.id.equals(req.user._id)) {
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