// var body = document.querySelector("body");
//Can use the above method as well, just remove the keyword 'document' from document.body.style...
var button = document.querySelector("button");

//var isPurple = false;
// button.addEventListener("click", function() {
//     if (isPurple) {
//         document.body.style.background = "white";
//     } else {
//         document.body.style.background = "purple";
//     }
//     isPurple = !isPurple;
// })
//The above solution will manually check for the background color, and will change it accordingly, and will negate the boolean variable isPurple. 

button.addEventListener("click", function() {
        document.body.classList.toggle("purple");
    })
    //The above solution is the most apt method as of now. It uses the .classList.toggle command for the class purple which we have defined using the style ...
    //... tag in our HTML file. The command will check whether the body tag has the class purple or not. If it has, then it will remove it & vice-versa ... 
    //... In this way, we won't have to perform the procedure manually using the if-else statements.