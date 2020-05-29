var Campground = require("../models/campgrounds"),
    Comment = require("../models/comment");

// All the middleware goes here
var middlewareObj = {};

// For the Authorisation of the LoggedIn User
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // Is User Logged In At All
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            // Added this block, to check if foundCampground exists
            if (err) {
                req.flash("error", "Campground Not Found!");
                res.redirect("back");
            } else {

                // Does User own the Campground
                // i.e. we need to compare foundCampground.author.id & req.user._id
                // However, the first one is a Mongoose Object & the second one is a String
                // But if we print them out, they will look the same
                if (foundCampground.author.id.equals(req.user._id)) {
                    // req.campground = foundCampground;
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

// For the Authorisation of the LoggedIn User
middlewareObj.checkCommentOwnership = function(req, res, next) {
    // Is User Logged In At All
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                // req.flash("error", "Comment Not Found!");
                res.redirect("back");
            } else {
                // Does User own the Comment
                // i.e. we need to compare foundComment.author.id & req.user._id
                // However, the first one is a Mongoose Object & the second one is a String
                // But if we print them out, they will look the same
                if (foundComment.author.id.equals(req.user._id)) {
                    // req.comment = foundComment;
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

// Middleware Function
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be Logged In to do that!");
    res.redirect('/login');
};

module.exports = middlewareObj;