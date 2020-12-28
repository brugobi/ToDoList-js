export default class Task {
  constructor(title, description, duedate, priority, project, id) {
    const isDone = false;
    id += 1;
    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.project = project;
    this.isDone = isDone;
    this.id = id;
  }
}