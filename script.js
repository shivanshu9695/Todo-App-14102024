const input = document.querySelector("#todo-input");
const form = document.querySelector("#todo-form");
const todoUl = document.querySelector(".todo-list");

let allTodos = getTodos();
updateTodo();

form.addEventListener("submit" ,function(e){
    e.preventDefault();
    addTodo();

});

function addTodo(){
    const todoText = input.value.trim();
    if(todoText.length > 0){
        allTodos.push(todoText);
        updateTodo();
        saveTodos();
        input.value = "";
    }
}

function updateTodo(){
    todoUl.innerHTML = "";
    allTodos.forEach((todo , todoIndex) => {
        todoItem = creatTodoItems(todo , todoIndex);
        todoUl.append(todoItem);
    })
}
function creatTodoItems(todo ,  todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    todoLi.innerHTML =`
                <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" fill="#4a4d57" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todo}
                </label>
                <button class="delete-btn">
                    <svg fill="#4a4d57" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            `
    const deleteButton = todoLi.querySelector(".delete-btn");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })
    return todoLi;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodo();
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}