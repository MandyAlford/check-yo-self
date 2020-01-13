class Task {
  constructor(name, completed){
    this.name = name;
    this.completed = completed || false;
  }
  completeTask(){
    this.completed = true;
  }
}
