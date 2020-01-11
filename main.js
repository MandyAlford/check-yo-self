

document.querySelector('#add-task-btn').addEventListener('click', addTaskItem);
document.querySelector('.draft-task').addEventListener('click', deleteTaskItem);
document.querySelector('#task-item-input').addEventListener('keyup', enableAddBtn);
document.querySelector('#make-task-btn').addEventListener('click', makeTaskList);

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
  var taskItems = document.querySelectorAll('.task-item');
  var cardContainer = document.querySelector('.card-container');
  var tasks = '';
  for(var i = 0; i < taskItems.length; i++) {
      tasks +=
        `<div class="card-task">
            <img src="assets/checkbox.svg" class="checkbox">
              <p>${taskItems[i].innerText}</p>
         </div>`;
  }
  var todoCardContent=
    `<div class="card">
      <div class="card-title">
      <h2 class="task-title">${taskTitle.value}</h2>
      </div>
      <div class="task-list">
    ${tasks}
      </div>
      <div class="card-action">
        <img src="assets/urgent.svg" alt="mark-urgent">
        <img src="assets/delete.svg" alt="delete">
      </div>
    </div>`
  cardContainer.insertAdjacentHTML('afterbegin', todoCardContent);
  clearDraftTask();
}

function clearDraftTask(){
  var taskTitle = document.querySelector('#task-title-input');
  var draftArea = document.querySelector('.draft-task');
  resetTaskItemInput();
  taskTitle.value = "";
  draftArea.innerHTML = "";
}
