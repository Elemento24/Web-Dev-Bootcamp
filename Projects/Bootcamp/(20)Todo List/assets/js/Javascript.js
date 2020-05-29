var lis = document.querySelectorAll('li');
var spans = document.querySelectorAll('li span');
var ul = document.querySelector('ul');
var input = document.querySelector("input[type='text']");
var toggleForm = document.querySelector('#toggle-form');

//Just do this, if in toggleForm add event listener, you want to use the ...
//statement if(input.style.display === "block")
//input.style.display = "block";

function todosEffects() {
	for (var i = 0; i < lis.length; i++) {
		lis[i].addEventListener('click', function() {
			this.classList.toggle('completed');
		});
	}

	for (var i = 0; i < spans.length; i++) {
		spans[i].addEventListener('click', function(event) {
			//Selecting the parent element of spans[i] which happens to be lis[i]
			var x = this.parentElement;
			//Calling the fadeout function which fades out the particular li.
			fadeOut(x);
			//Adding a delay of 1000ms before removing the li from the HTML, so that the transition can take it's time to complete.
			setTimeout(function() {
				//Removing the li from the HTML
				x.parentNode.removeChild(x);
			}, 1000);
			//Stopping the propagation of event listeners from parent element, which is lis[i] to the child element which is spans[i].
			event.stopPropagation();
		});
	}
}

function fadeOut(element) {
	var op = 1; // initial opacity
	var timer = setInterval(function() {
		if (op <= 0.1) {
			clearInterval(timer);
			element.style.display = 'none';
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ')';
		op -= op * 0.1;
	}, 25);
}

function fadeIn(element) {
	var op = 0.1; // initial opacity
	element.style.display = 'block';
	var timer = setInterval(function() {
		if (op >= 1) {
			clearInterval(timer);
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ')';
		op += op * 0.1;
	}, 25);
}

todosEffects();

input.addEventListener('keydown', function(event) {
	if (event.which === 13) {
		var todoText = this.value;
		var li = document.createElement('li');
		ul.insertAdjacentHTML('beforeend', "<li><span><i class='fa fa-trash-alt'></i></span> " + todoText + ' </li>');
		this.value = '';
		lis = document.querySelectorAll('li');
		spans = document.querySelectorAll('li span');
		todosEffects();
	}
});

toggleForm.addEventListener('click', function() {
	if (input.style.display !== 'none') {
		fadeOut(input);
	} else {
		fadeIn(input);
	}
});
