class TodoList {
  constructor(id, title, tasks, urgent){
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }

  saveToStorage(){
    if (localStorage.length === 0){
      var list = [];
    } else {
      var tempList= localStorage.getItem("masterList");
      var list = JSON.parse(tempList);
    }
    list.push(this);
    localStorage.setItem("masterList", JSON.stringify(list));
  }

  deleteFromStorage(masterList, currentIndex){
    masterList.splice(currentIndex, 1);
    localStorage.setItem("masterList", JSON.stringify(masterList));
  }

  updateToDo(masterList){
    this.urgent = true;
    localStorage.setItem("masterList", JSON.stringify(masterList));
  }

  updateTask(completedTaskName) {
    for (var i = 0; i < this.tasks.length; i++){
      if (this.tasks[i].name === completedTaskName){
        this.tasks[i].completeTask();
      }
    }
  }

  updateStorage(masterList){
    localStorage.setItem("masterList", JSON.stringify(masterList));
  }

  allTasksCompleted() {
    return this.tasks.every(function(task) {
      return task.completed
    })
  }
}
