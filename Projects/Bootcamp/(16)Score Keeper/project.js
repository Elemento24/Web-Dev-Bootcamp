// var p1Button = document.querySelector("#p1");
// var p2Button = document.querySelector("#p2");
// var resetButton = document.querySelector("#reset");
// var p1Display = document.querySelector("#p1Display");
// var p2Display = document.querySelector("#p2Display");
// var p1Score = 0;
// var p2Score = 0;
// var numInput = document.querySelector("input");
// var lim = 5;
// var para = document.querySelector("p span");

// p1Button.addEventListener("click", function () {
//     if (p1Score < lim && p2Score < lim) {
//         p1Score++;
//         p1Display.textContent = p1Score;
//     }
//     if (p1Score === lim) {
//         p1Display.classList.add("winner");
//     }
// })

// p2Button.addEventListener("click", function () {
//     if (p2Score < lim && p1Score < lim) {
//         p2Score++;
//         p2Display.textContent = p2Score;
//     }
//     if (p2Score === lim) {
//         p2Display.classList.add("winner");
//     }
// })

// resetButton.addEventListener("click", function () {
//     reset();
// })

// function reset() {
//     p1Score = 0;
//     p2Score = 0;
//     p1Display.textContent = p1Score;
//     p2Display.textContent = p2Score;
//     p1Display.classList.remove("winner");
//     p2Display.classList.remove("winner");
// }

// numInput.addEventListener("change", function () {
//     lim = Number(numInput.value);
//     para.textContent = Number(numInput.value);
//     reset();
// })

//The above code is the perosnal code with some differences
//The below code is Colt's code

var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");
var winningScoreDisplay = document.querySelector("p span");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function () {
    if (!gameOver) {
        p1Score++;
        if (p1Score === winningScore) {
            p1Display.classList.add("winner");
            gameOver = true;
        }
        p1Display.textContent = p1Score;
    }
});

p2Button.addEventListener("click", function () {
    if (!gameOver) {
        p2Score++;
        if (p2Score === winningScore) {
            p2Display.classList.add("winner");
            gameOver = true;
            var winningScoreDisplay = document.querySelector("p span");
        }
        p2Display.textContent = p2Score;
    }
});

resetButton.addEventListener("click", function () {
    reset();
});

function reset() {
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    gameOver = false;
};

numInput.addEventListener("change", function () {
    winningScore = Number(numInput.value);
    winningScoreDisplay.textContent = Number(numInput.value);
    reset();
});