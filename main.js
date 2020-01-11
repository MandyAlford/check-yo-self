

document.querySelector('#add-task-btn').addEventListener('click', addTaskItem);
document.querySelector('.draft-task').addEventListener('click', deleteTaskItem);
document.querySelector('#task-item-input').addEventListener('keyup', enableAddBtn);

function addTaskItem(){
  var taskItem = document.querySelector('#task-item-input');
  var draftArea = document.querySelector('.draft-task');

  draftArea.innerHTML += `<div class="draft-task-item">
                            <img class="draft-delete" src="assets/delete.svg"/>
                            <p>${taskItem.value}</p>
                          </div>`;
  resetTaskItemInput();
}

function resetTaskItemInput(){
  var taskItem = document.querySelector('#task-item-input');
  var addTaskBtn = document.querySelector('#add-task-btn');
  addTaskBtn.classList.add('avoid-clicks');
  taskItem.value = "";
}

function deleteTaskItem(){
  if (event.target.classList.contains('draft-delete')){
    event.target.parentElement.remove();
  }
}

function enableAddBtn(){
    var taskItem = document.querySelector('#task-item-input');
    var addTaskBtn = document.querySelector('#add-task-btn');
  if (taskItem.value){
    addTaskBtn.classList.remove('avoid-clicks');
  }
}
