var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');

// Requiring Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Seeding the Database
// seedDB();

// PASSPORT CONFIGURATION
app.use(
    require('express-session')({
        secret: 'Once again, Rusty wins cutest dog!',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Using our own Middleware to pass req.user to every template
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var port = 3000 || process.env.PORT;
app.listen(port, function() {
    console.log('Hurray, the Server got started!');
});