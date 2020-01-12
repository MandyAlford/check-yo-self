

document.querySelector('#add-task-btn').addEventListener('click', addTaskItem);
document.querySelector('.draft-task').addEventListener('click', deleteTaskItem);
document.querySelector('#task-item-input').addEventListener('keyup', enableAddBtn);
document.querySelector('#make-task-btn').addEventListener('click', makeTaskList);
document.querySelector('#task-title-input').addEventListener('keyup', enableMakeTaskBtn);

function getTaskItem(){
    return document.querySelector('#task-item-input');
}

function addTaskItem(){
  var draftArea = document.querySelector('.draft-task');

  draftArea.innerHTML += `<div class="draft-task-item">
                            <img class="draft-delete" src="assets/delete.svg"/>
                            <p class="task-item">${getTaskItem().value}</p>
                          </div>`;
  resetTaskItemInput();
}

function resetTaskItemInput(){
  var addTaskBtn = document.querySelector('#add-task-btn');
  addTaskBtn.classList.add('avoid-clicks');
  getTaskItem().value = "";
}

function deleteTaskItem(){
  if (event.target.classList.contains('draft-delete')){
    event.target.parentElement.remove();
  }
}

function enableAddBtn(){
  var addTaskBtn = document.querySelector('#add-task-btn');
  if (getTaskItem().value){
    addTaskBtn.classList.remove('avoid-clicks');
  }
}

function makeTaskList(){
  var taskTitle = document.querySelector('#task-title-input');
  var taskTitleVal = taskTitle.value
  var taskItems = document.querySelectorAll('.task-item');
  var cardContainer = document.querySelector('.card-container');
  var makeTaskBtn = document.querySelector('#make-task-btn');


  clearDraftTask();
  var todoList = makeTodoList(taskTitleVal, taskItems);
  var todoCardContent = generateCardContent(todoList);
  cardContainer.insertAdjacentHTML('afterbegin', todoCardContent);

  storeTodoList(todoList);

  makeTaskBtn.classList.add('avoid-clicks');
}

function generateCardContent(todoList){
  var tasks = '';

  for(var i = 0; i < todoList.tasks.length; i++) {
      tasks +=
        `<div class="card-task">
            <img src="assets/checkbox.svg" class="checkbox">
              <p>${todoList.tasks[i].name}</p>
         </div>`;
  }
  return `<div class="card">
      <div class="card-title">
      <h2 class="task-title">${todoList.title}</h2>
      </div>
      <div class="task-list">
    ${tasks}
      </div>
      <div class="card-action">
        <img src="assets/urgent.svg" alt="mark-urgent">
        <img src="assets/delete.svg" alt="delete">
      </div>
    </div>`
}

function clearDraftTask(){
  var taskTitle = document.querySelector('#task-title-input');
  var draftArea = document.querySelector('.draft-task');
  resetTaskItemInput();
  taskTitle.value = "";
  draftArea.innerHTML = "";
}

function enableMakeTaskBtn(){
  var taskTitle = document.querySelector('#task-title-input');
  var makeTaskBtn = document.querySelector('#make-task-btn');
  var draftArea = document.querySelector('.draft-task');

  if ((draftArea.innerHTML !=="") && (taskTitle.value)){
    makeTaskBtn.classList.remove('avoid-clicks');
  }
}

function makeTodoList(taskTitleVal, taskItems){
  var list = [];
  var id = generateId();
  // console.log(taskTitleVal, taskItems);
  for(var i = 0; i<taskItems.length; i++){
    list.push(new Task(taskItems[i].innerText));
  }

  // var todolist = new TodoList(id, taskTitleVal, list);
  return new TodoList(id, taskTitleVal, list);
}

function generateId(){
  return Date.now();
}

function storeTodoList(todoList){
  // localStorage.setItem()
}
