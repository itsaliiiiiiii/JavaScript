const todoList = [
  {
  name: 'review course',
  dueDate: '2025-09-29'
},
  {
  name: 'review course',
  dueDate: '2025-09-29'
},
  {
  name: 'review course',
  dueDate: '2025-09-29'
},
  {
  name: 'review course',
  dueDate: '2025-09-29'
},
  {
  name: 'review course',
  dueDate: '2025-09-29'
},
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todo,index)=>{
    todoListHTML += "<div>" + todo.name + "</div> " + "<div>" + todo.dueDate + "</div> " + "<button class='delete-todo-button'>delete</button>" ;
  });

  let htmlTodo = document.querySelector(".js-todo-list");
  htmlTodo.innerHTML = todoListHTML ;

  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  // Loop over evey delete button and add an eventListener that deletes the toDo and rerender the Tasks


}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"

  todoList.push({
    name: name,
    dueDate: dueDate
  })

  inputElement.value = '';

  renderTodoList();
}