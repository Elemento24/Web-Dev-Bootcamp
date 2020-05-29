var todos = [];

window.setTimeout(function(){
	var input = prompt("What would you like to do!");
	while(input!=="quit"){
		if(input==="new"){
			addTodo();
		}
		else if(input==="list"){
			listTodo();
		}
		else if(input==="delete"){
			deleteTodo();
		}
		else{
			console.log("Please enter a valid operation!");
		}
		input = prompt("What would you like to do!");
	}
	console.log("OK, you quit the app!");

	function addTodo(){
		var todo = prompt("Add a new to-do!");
		console.log("Added a new To-do!");
		todos.push(todo);
	}
	function listTodo(){
		console.log("********************");
		//Pasiing two arguments to forEach, the first being an item of an array, and the second is the index of the said item.
		todos.forEach(function(todo,ind){
			console.log(ind+": "+todo);
		})
		console.log("********************");
	}
	function deleteTodo(){
		var ind = prompt("Please enter the index of to-do that you want to delete!");
		//splice function can be used to delete items of an array.
		//It takes two arguments, the first being the index of the first item that needs to be deleted, and the second is the number of items that need...
		//...to be deleted following that item in the array. 
		todos.splice(ind,1);
		console.log("Deleted the required To-do!");
	}
},500)