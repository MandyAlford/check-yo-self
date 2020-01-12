

document.querySelector('#add-task-btn').addEventListener('click', addTaskItem);
document.querySelector('.draft-task').addEventListener('click', deleteTaskItem);
document.querySelector('#task-item-input').addEventListener('keyup', enableAddBtn);
document.querySelector('#make-task-btn').addEventListener('click', makeTaskList);
document.querySelector('#task-title-input').addEventListener('keyup', enableMakeTaskBtn);
document.querySelector('#clear-btn').addEventListener('click', clearAll);

document.onload = onPageLoad();

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
  var makeTaskBtn = document.querySelector('#make-task-btn');

  clearDraftTask();
  var todoList = makeTodoList(taskTitleVal, taskItems);
  var todoCardContent = generateCardContent(todoList);

  addCardToPage(todoCardContent);
  todoList.saveToStorage();
  makeTaskBtn.classList.add('avoid-clicks');
}

function addCardToPage(todoCardContent){
  var cardContainer = document.querySelector('.card-container');
  cardContainer.insertAdjacentHTML('afterbegin', todoCardContent);
}

function generateCardContent(todoList){
  var tasks = '';
  debugger
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

  if ((draftArea.innerText !=="") && (taskTitle.value)){
    makeTaskBtn.classList.remove('avoid-clicks');
  }
}

function makeTodoList(taskTitleVal, taskItems){
  var list = [];
  var id = generateId();

  for(var i = 0; i<taskItems.length; i++){
    list.push(new Task(taskItems[i].innerText));
  }
  return new TodoList(id, taskTitleVal, list);
}

function generateId(){
  return Date.now();
}

function onPageLoad(){
  var tempList = localStorage.getItem("masterList");
  var masterList = JSON.parse(tempList) || [];
  // debugger
  for (var i = 0; i < masterList.length; i++){
    // debugger
    var  todoCardContent = generateCardContent(masterList[i]);
    addCardToPage(todoCardContent);
  }
}

function clearAll(){
  clearDraftTask();
  resetTaskItemInput();
  document.querySelector('#task-title-input').innerText = "";
}
