var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo_2", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

var Post = require("./models/post");
var User = require("./models/user");

Post.create({
    title: "How to cook the best Burger, part 4",
    content: "Hayla Jadoo Phirse!"
}, function(err, post) {
    User.findOne({
        email: "bob@gmail.com"
    }, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// FIND USER
// FIND ALL POSTS FOR THE USER
// User.findOne({
//     email: "bob@gmail.com"
// }).populate("posts").exec(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });