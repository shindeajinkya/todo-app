const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let itemCount = 0
let uncheckedItemCount = 0

//An array to save all todos
let todos = [

]

function takeInput() {
  let todo = prompt("Enter a todo: ")
  let moment = new Date()
  return { id: itemCount, todo, moment, checked: false }
}

function addTodos() {
  let todo = takeInput()
  console.log(todo)
  todos.push(todo)
  renderList(todos)
  updateItemCount(1)
  updateUncheckedItemCount(1)
}

function deleteTodo(dateValue) {
  const newArr = todos.filter(
    todo => todo.moment.valueOf() !== dateValue
  )
  todos = newArr
  renderList(newArr)
  updateItemCount(-1)
}

function updateItemCount(difference) {
  itemCount += difference
  itemCountSpan.innerHTML = itemCount
}

function updateUncheckedItemCount(difference) {
  uncheckedItemCount += difference
  uncheckedCountSpan.innerHTML = uncheckedItemCount
}

function changeState(dateValue, val) {
  if (val === false) {
    updateUncheckedItemCount(-1)
    let findIndex = todos.findIndex(to => to.moment.valueOf() == dateValue)
    todos[findIndex].checked = true
  }
  if (val === true) {
    updateUncheckedItemCount(1)
    let findIndex = todos.findIndex(to => to.moment.valueOf() == dateValue)
    todos[findIndex].checked = false
  }
  renderList(todos)
}

function renderTodo({ todo, moment, checked }) {
  if (checked === true) {
    return `
        <li class="todo-container">
          <input type="checkbox" class="todo-checkbox" onchange="changeState(${moment.valueOf()},${checked})" checked>
          <span class="todo-text">${todo}</span>
          <button class="todo-delete" onclick="deleteTodo(${moment.valueOf()})">Delete</delete>
        </li>`
  } else {
    return `
      <li class="todo-container">
        <input type="checkbox" class="todo-checkbox" onchange="changeState(${moment.valueOf()},${checked})">
        <span class="todo-text">${todo}</span>
        <button class="todo-delete" onclick="deleteTodo(${moment.valueOf()})">Delete</delete>
      </li>`
  }
}

function renderList(arr) {
  let todoHTML = arr.map((cur) => renderTodo(cur))
  let joinedTodoHtml = todoHTML.join("")
  list.innerHTML = joinedTodoHtml
  todos = arr
}
