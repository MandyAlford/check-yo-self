

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
                            <p>${getTaskItem().value}</p>
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

}
