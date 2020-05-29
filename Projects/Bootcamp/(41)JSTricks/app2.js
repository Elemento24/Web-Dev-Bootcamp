function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
};

Vehicle.prototype.turnOn = function() {
    this.isRunning = true;
};

Vehicle.prototype.turnOff = function() {
    this.isRunning = false;
};

Vehicle.prototype.honk = function() {
    if (this.isRunning)
        return 'beep!';
};

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Hayla Jadoo!');
});