var mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

mongoose.connect('mongodb://localhost:27017/restful_blog', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

// ===========
// APP CONFIG
// ===========

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(expressSanitizer());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methOverride("_method"));

// ======================
// MONGOOSE/MODEL SCHEMA
// ======================

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model('Blog', blogSchema);

// ===============
// RESTFUL ROUTES
// ===============

app.get('/', function(req, res) {
    res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                blogs: blogs
            });
        }
    });
});

// NEW ROUTE
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

// CREATE ROUTE
app.post('/blogs', function(req, res) {
    //Create a blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render('new');
        } else {
            // Then, redirect to the Index
            res.redirect('/blogs');
        }
    });
});

// SHOW ROUTE
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {
                blog: foundBlog
            });
        }
    });
});

// EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('edit', {
                blog: foundBlog
            });
        }
    });
});

// UPDATE ROUTE
app.put('/blogs/:id', function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    // Destroy the Blog
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            // Redirect
            res.redirect("/blogs");
        }
    });
});

var port = 3000 || process.env.PORT;
app.listen(port, function() {
    console.log('The Blog Server got started!!');
});