var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
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
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('campgrounds');
        });
    });
});

// Show Login Form
router.get('/login', function(req, res) {
    res.render('login');
});

// Handling Login Logic
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),
    function(req, res) {}
);

// Logout Route
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;