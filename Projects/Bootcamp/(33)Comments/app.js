var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds');

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
seedDB();

app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX- Show all Campgrounds
app.get('/campgrounds', function(req, res) {
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
app.post('/campgrounds', function(req, res) {
    // Get data from the form and add it to Campgrounds Array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
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
app.get('/campgrounds/new', function(req, res) {
    res.render('campgrounds/new');
});

// We need to make sure that this route is posted after campgrounds/new
// Otherwise there will be a clash of Routes

// SHOW- Shows more info about the selected Campground
app.get('/campgrounds/:id', function(req, res) {
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

// ==================
// COMMENTS ROUTES
// ==================

app.get('/campgrounds/:id/comments/new', function(req, res) {
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

app.post('/campgrounds/:id/comments', function(req, res) {
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

var port = 3000 || process.env.PORT;
app.listen(port, function() {
    console.log('Hurray, the Server got started!');
});