class TodoList {
  constructor(id, title, tasks, urgent){
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent ||false;
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

  deleteFromStorage(){

  }
  updateToDo(){

  }
  updateTask(){

  }
}
