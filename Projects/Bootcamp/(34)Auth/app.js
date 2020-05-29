var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    User = require('./models/user'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/auth_demo', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use(
    require('express-session')({
        secret: 'Rusty is the best dog in the World!',
        resave: false,
        saveUninitialized: false
    })
);

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================
// ROUTES
// ================

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res) {
    res.render('secret');
});

// ================
// AUTH ROUTES
// ================

// Show sign-up form
app.get('/register', function(req, res) {
    res.render('register');
});

// Handling user sign-up
app.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/secret');
        });
    });
});

// ====================
// LOGIN ROUTES
// ====================

// Render Login Form
app.get('/login', function(req, res) {
    res.render('login');
});

// Login Logic
// Middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {});

// ====================
// LOGOUT ROUTE
// ====================

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

var port = 3000 || process.env.PORT;
app.listen(port, function() {
    console.log('Hayla Jadoo!');
});