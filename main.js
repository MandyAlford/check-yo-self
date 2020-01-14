

document.querySelector('#add-task-btn').addEventListener('click', addTaskItem);
document.querySelector('.draft-task').addEventListener('click', deleteTaskItem);
document.querySelector('#task-item-input').addEventListener('keyup', enableAddBtn);
document.querySelector('#make-task-btn').addEventListener('click', makeTaskList);
document.querySelector('#task-title-input').addEventListener('keyup', enableMakeTaskBtn);
document.querySelector('#clear-btn').addEventListener('click', clearAll);
document.querySelector('.card-container').addEventListener('click', cardAction);

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
  enableMakeTaskBtn();

  document.querySelector('#clear-btn').classList.remove('avoid-clicks');
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
  var urgentStatus = determineUrgency(todoList);

  for(var i = 0; i < todoList.tasks.length; i++) {
    var checkboxStatus
    if (todoList.tasks[i].completed === false){
      checkboxStatus = "checkbox";
      classStatus = "";
    } else {
      checkboxStatus = "checkbox-active";
      classStatus = 'class = "active"';
    }
    tasks +=
      `<div class="card-task">
          <div class="image ${checkboxStatus}"></div>
          <p ${classStatus}>${todoList.tasks[i].name}</p>
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
        <div class="urgency ${urgentStatus}"></div>
        <img src="assets/delete.svg" class="delete-card">
      </div>
    </div>`
}

function determineUrgency(todoList){
  if (todoList.urgent === true){
    return "urgent-active"
  } else {
    return "mark-urgent";
  }
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
  var masterList = getTodoListsFromStorage();

  for (var i = 0; i < masterList.length; i++){

    var  todoCardContent = generateCardContent(masterList[i]);
    addCardToPage(todoCardContent);
  }
}

function getTodoListsFromStorage(){
  var tempList = localStorage.getItem("masterList");
  var parsedList = JSON.parse(tempList)|| [];

  return parsedList.map(function(todo){
    return new TodoList(
      todo.id,
      todo.title,
      todo.tasks.map(function(task){
        return new Task(task.name, task.completed)
      }),
      todo.urgent
    );
  })
}


function clearAll(){
  clearDraftTask();
  resetTaskItemInput();
  document.querySelector('#task-title-input').innerText = "";
  document.querySelector('#clear-btn').classList.add('avoid-clicks');
}

function cardAction(){
  if (event.target.classList.contains('checkbox')){
    activateCheckbox();
    completeTask();
  } else if (event.target.classList.contains('delete-card')){
    checkTaskStatus();
  } else if (event.target.classList.contains('mark-urgent')){
    markAsUrgent();
  }
}

function markAsUrgent(){
debugger
  event.target.classList.remove('mark-urgent');
  event.target.classList.add('urgent-active');
  event.target.parentElement.parentElement.classList.add('urgent');
}

function checkTaskStatus(){
  var activeTodoListTitle = event.target.parentElement.parentElement.children[0].innerText.trim();
  var masterList = getTodoListsFromStorage();
  var currentTodoList

  for (var i = 0; i<masterList.length; i++){
    if (masterList[i].title === activeTodoListTitle){
      currentTodoList = masterList[i];
    }
  }

  if (currentTodoList.allTasksCompleted()) {
    deleteCard();
    removeTodoListFromStorge(event);
  }
}

function removeTodoListFromStorge(event){
  var activeTodoListTitle = event.target.parentElement.parentElement.children[0].innerText.trim();
  var masterList = getTodoListsFromStorage();
  var currentTodoList

  for (var i = 0; i<masterList.length; i++){
    if (masterList[i].title === activeTodoListTitle){
      currentTodoList = masterList[i];
      currentIndex = i;
    }
  }
  currentTodoList.deleteFromStorage(masterList, currentIndex);
}


function deleteCard(){
  event.target.parentElement.parentElement.remove();
}


function completeTask(){
  var currentTodoList
  var activeTodoListTitle = event.target.parentElement.parentElement.parentElement.children[0].innerText;
  var completedTaskName = event.target.nextElementSibling.innerText;
  var masterList = getTodoListsFromStorage();

  for (var i = 0; i<masterList.length; i++){
    if (masterList[i].title === activeTodoListTitle){
      currentTodoList = masterList[i];
    }
  }
  currentTodoList.updateTask(completedTaskName);
  currentTodoList.updateStorage(masterList);
}

function activateCheckbox(){
  event.target.classList.remove('checkbox');
  event.target.classList.add('checkbox-active');
  event.target.nextElementSibling.classList.add('active');
}
