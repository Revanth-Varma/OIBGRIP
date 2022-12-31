var buttonNode = document.getElementById("button");
var inputNode = document.getElementById("input");
var parent = document.getElementById("parent");

var todos1 = getTodos();

todos1.forEach(function(todo){
  addingTodo(todo);
});

inputNode.addEventListener("keypress",function(event){

  var value = getValue();

  if(!isValidValue(value)){
    return;
  }

  if(event.key==="Enter"){

    addingTodo(value);

    addingLocal(value);

    clearInput();
  }

})


buttonNode.addEventListener("click",function(){

  var value = getValue();

  if(!isValidValue(value)){

    console.log("Write Something");

    return;
  }

  addingTodo(value);

  addingLocal(value);

  clearInput();
});


function getValue(){
  return inputNode.value;
}

function isValidValue(value){
  if(value){
    return true;
  }
  return false;
}

function addingTodo(value){
  
  var newDivNode = document.createElement("div");
  newDivNode.classList.add("todo-div");
  parent.appendChild(newDivNode);

  var newPara = document.createElement("p");
  newPara.innerText = value;
  newDivNode.appendChild(newPara);

  var buttonContainer = document.createElement("div");
  newDivNode.appendChild(buttonContainer);

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.innerText = "delete";
  buttonContainer.appendChild(deleteButton);

  var readButton = document.createElement("button");
  readButton.classList.add("btn");
  readButton.innerText = "read";
  buttonContainer.appendChild(readButton);
  

  deleteButton.addEventListener("click" , function(){
    parent.removeChild(newDivNode);
    var todos = getTodos();

    if(todos){
      var index = todos.indexOf(value);
      todos.splice(index,1);
      localStorage.setItem("todos",JSON.stringify(todos));
    }
  })

  readButton.addEventListener("click" , function(){
    newPara.style.textDecoration = "line-through";
  })
}

function clearInput(){
  inputNode.value = "";
}


function getTodos(){
  var todos = localStorage.getItem("todos");
  if(todos){
    return JSON.parse(todos);
  }
  return [];
}

function addingLocal(value){
  var todos = getTodos();
  todos.push(value);
  localStorage.setItem("todos",JSON.stringify(todos));
}