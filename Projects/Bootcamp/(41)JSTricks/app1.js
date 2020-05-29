var express = require('express');
var app = express();

function Dog(name, age) {
    this.name = name;
    this.age = age;
    this.bark = function() {
        console.log(this.name + ' just barked');
    }
};

var rusty = new Dog('Rusty', 3);
var fido = new Dog('Fido', 1);

console.log(rusty.name);
console.log(rusty.age);
rusty.bark();
fido.bark();

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Hayla Jadoo!');
});