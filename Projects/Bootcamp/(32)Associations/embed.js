var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

// POST - title,content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email,name 
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "hermione@granger.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to Brew Poly Juice Potion",
//     content: "Just Kidding, go to Potions class to learn it!"
// });

// newUser.save(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflection on Apples",
//     content: "They are delicious!"
// });

// newPost.save(function(err, post) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// })

User.findOne({
    name: "Hermione Granger"
}, function(err, user) {
    if (err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "Three things I really hate!",
            content: "Voldemort, Voldemort & Voldemort"
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});