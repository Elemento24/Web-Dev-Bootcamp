//Check of Specific Todos by clicking 
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

//Click on X to delete To-Do
$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });
    //Makes sure that the listeners on the parent element are not fired up.
    event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        //Grabbing new Todo Text from Input
        var todoText = $(this).val();
        //Emptying the input, once the new LI is added
        $(this).val("");
        //Create a new Li and add to Ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + " </li>");
    }
});

$("#toggle-form").click(function () {
    $("input[type='text']").fadeToggle();
});