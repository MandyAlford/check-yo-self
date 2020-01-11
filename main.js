

document.querySelector('#add-task-btn').addEventListener('click', addTaskItem);

function addTaskItem(){
  var taskItem = document.querySelector('#task-item-input');
  var draftArea = document.querySelector('.draft-task');
  draftArea.innerHTML += `<div class="draft-task-item">
                            <img class="draft-delete" src="assets/delete.svg"/>
                            <p>${taskItem.value}</p>
                          </div>`;

}
