//Be very cautious about spaces when writing colors, because when browser..
//... will pick the color, it will only pick, in the spaced format..
///.. such as rgb(0, 255, 0);

var colors = [];
var numSquares = 6;
var pickedColor;
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#resetButton');
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll('.square');

init();

function init() {
	//modeButtons Event Listeners
	setUpModeButtons();
	//Squares Event Listeners
	setUpSquares();

	reset();
}

function reset() {
	//Generate all new colors
	colors = generateRandomColors(numSquares);
	//Pick a new random color from the array
	pickedColor = pickColor();
	//Change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	//Changing back the message of colorDisplay
	messageDisplay.textContent = "";
	//Change the colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			//Figure out how many squares to show
			//Pick New Colors
			//Pick a new pickedColor
			//Update page to reflect changes

			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;

			//A different way to do the same thing is written above
			// if (this.textContent === "easy") {
			// 	numSquares = 3;
			// } else {
			// 	numSquares = 6;
			// }

			reset();
		})
	}
}

function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {

		//Add Click Listeners to Squares
		squares[i].addEventListener('click', function () {
			//Grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//Compare color to the pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try Again!';
			}
		});
	}
}

//The below code was used when the easy button had an ID of easyBtn
// easyBtn.addEventListener("click", function () {
// 	hardBtn.classList.remove("selected");
// 	easyBtn.classList.add("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		if (colors[i]) {
// 			squares[i].style.background = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

//The below code was used when the hard button had an ID of hardBtn
// hardBtn.addEventListener("click", function () {
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		if (colors[i]) {
// 			squares[i].style.background = colors[i];
// 			squares[i].style.display = "block";
// 		}
// 	}
// })

resetButton.addEventListener('click', function () {
	reset();
});

function changeColors(color) {
	//Loop through all the squares
	//Change each color to match the given color
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	//Math.random() generates any random number between 0 and 1 excluding both
	//When we multiply it by some interval it will generate a random number...
	//.. in that interval.
	//Math.floor will give the GIF of that random number.
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//Make an array
	var arr = [];
	//Repeat num times
	for (var i = 0; i < num; i++) {
		//Get random color and push them into array
		arr.push(randomColor());
	}
	//Return the array at the end
	return arr;
}

function randomColor() {
	//Pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//Pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//Pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}