var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    middleware = require("../middleware"), // If we just require a directory, then by default index.js is required...
    User = require("../models/user");

// Root Route
router.get('/', function(req, res) {
    res.render('landing');
});

// ================
// AUTH ROUTES
// ================

// Show the Register Form
router.get('/register', function(req, res) {
    res.render('register');
});

// Handle Sign-up Logic
router.post('/register', function(req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            // req.flash("error", err.message);
            return res.render('register', {
                "error": err.message
            });
        }
        passport.authenticate('local')(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('campgrounds');
        });
    });
});

// Show Login Form
router.get('/login', function(req, res) {
    res.render('login');
});

// Handling Login Logic
// router.post(
//     '/login',
//     passport.authenticate('local', {
//         successRedirect: '/campgrounds',
//         failureRedirect: '/login',
//         failureFlash: true,
//         successFlash: "Welcome Back!"
//     }),
//     function(req, res) {
//         console.log(User);
//     }
// );

// In the previous method to Handle Login Logic, we can't add Username to flash message
// Use Below Code to do that...
router.post("/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/login");
        }
        // User is set to false if auth fails.
        if (!user) {
            req.flash("error", info.message);
            return res.redirect("/login");
        }
        // Establish a session manually with req.logIn
        req.logIn(user, function(err) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/login");
            }

            // Login success! Add custom success flash message.
            req.flash("success", "Welcome back " + user.username + "!");
            res.redirect("/campgrounds");

        });
    })(req, res, next);
});

// Logout Route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect('/campgrounds');
});

module.exports = router;