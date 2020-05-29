var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// We took the Cat Schema, which is just a pattern that says that every cat has name, age and temperament
// ...and we compile into a model
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// We have created this Cat Object and it has all the methods on it
var Cat = mongoose.model("Cat", catSchema);

// There are 2 different methods of adding an Object in the DB
// The first method is to create an Object & then add it using create method.
// The second method is to create the Object inside the Create method only.

// Adding a new cat to the DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 1,
//     temperament: "Grouchy"
// });

// george.save(function(err, cat) {
//     if (err) {
//         console.log("Something went wrong!");
//     } else {
//         console.log("We just saved a cat to the DB");
//         console.log(cat);
//     }
// })

Cat.create({
    name: "Bella",
    age: 5,
    temperament: "Beautiful"
}, function(err, cat) {
    if (err) {
        console.log("Error");
    } else {

        console.log(cat);

        // Retrieve all cats from the DB and console.log each one
        // We need to use find method on cat model
        Cat.find({}, function(err, cats) {
            if (err) {
                console.log("Oh no, Error!");
                console.log(err);
            } else {
                console.log("All the Cats...");
                console.log(cats);
            }
        })

    }
});

// Retrieve all cats from the DB and console.log each one
// We need to use find method on cat model
// Why are we using the find method inside create method, this Question might come up!
// The most important thing to know is that the Callback functions...
// ... in the order, they appear. Instead, they get evaluated according to the timing conditions.
// So if we want to avoid the random call order of Callback Functions...
// ... We can use callback functions one inside another, as in this case.

// Cat.find({}, function(err, cats) {
//     if (err) {
//         console.log("Oh no, Error!");
//         console.log(err);
//     } else {
//         console.log("All the Cats...");
//         console.log(cats);
//     }
// })