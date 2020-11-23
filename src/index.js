import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import {
  createProjectForm,
  displayToDoModal,
  displayAllTasks,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
  loadProjects,
}
  from './functions';

// let toDos;

// localStorage.setItem('toDos', JSON.stringify(toDos));
// toDos = JSON.parse(localStorage.getItem('toDos') || '[]');
// toDos.push({id: 1, foo: "bar"});
// console.log(toDos);
let arrayOfProjects = [];

if (localStorage.getItem('arrayOfProjects') !== null) {
  arrayOfProjects = JSON.parse(localStorage.getItem('arrayOfProjects'));
} else {
  localStorage.setItem('arrayOfProjects', JSON.stringify(['hello', 'world']));
  arrayOfProjects = JSON.parse(localStorage.getItem('arrayOfProjects'));
}
let arrayOfTodos = [];
if (localStorage.getItem('arrayOfTodos') !== null) {
  arrayOfTodos = JSON.parse(localStorage.getItem('arrayOfTodos'));
} else {
  localStorage.setItem('arrayOfTodos', JSON.stringify([{
    title: 'ASD', description: 'ASD', duedate: '2020-11-23T01:00:00.000', priority: true, project: 'hello', isDone: false, id: 1,
  }, {
    title: 'ASD', description: 'ASD', duedate: '2020-11-26T16:00:00.000', priority: true, project: 'hello', isDone: false, id: 2,
  }, {
    title: 'ASD', description: 'ASD', duedate: '2020-11-26T18:00:00.000', priority: true, project: 'hello', isDone: false, id: 3,
  }, {
    title: 'ASD', description: 'ASD', duedate: '2020-11-26T21:00:00.000', priority: true, project: 'world', isDone: false, id: 4,
  }, {
    title: 'ASD', description: 'ASD', duedate: '2020-11-26T23:00:00.000', priority: true, project: 'world', isDone: false, id: 5,
  }, {
    title: 'ASD', description: 'ASD', duedate: '2020-11-26T23:45:00.000', priority: true, project: 'world', isDone: false, id: 6,
  }, {
    title: 'ASD', description: 'ASD', duedate: '2020-11-21T01:00:00.000', priority: true, project: 'hello', isDone: false, id: 7,
  }]));
  arrayOfTodos = JSON.parse(localStorage.getItem('arrayOfTodos'));
}
console.log(arrayOfTodos);
function addEventListenerByClass(className, event, fn) {
  const list = document.getElementsByClassName(className);
  for (let i = 0, len = list.length; i < len; i += 1) {
    list[i].addEventListener(event, fn);
  }
}
const newTodoBtn = document.getElementById('newTodoFormBtn');
newTodoBtn.addEventListener('click', () => {
  displayToDoModal();
});

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
  createProjectForm(arrayOfProjects);
});


const btnAllTasks = document.getElementById('btnAllTasks');
btnAllTasks.addEventListener('click', () => {
  displayAllTasks();
});

const btnTodayTasks = document.getElementById('btnTodayTasks');
btnTodayTasks.addEventListener('click', () => {
  displayTasksforToday(arrayOfTodos);
  addEventListenerByClass('delete', 'click', (e) => {
    arrayOfTodos = deleteTodoObjFromArray(arrayOfTodos, e.target.id);
    deleteTodoHTML(e.target);
    return arrayOfTodos;
  });
});

window.addEventListener('DOMContentLoaded', (event) => {
  loadProjects(arrayOfProjects);
  // const btnbyProject = document.getElementById('btnbyProject');
  const btnbyProject = document.getElementById('aside-project-list');
  btnbyProject.addEventListener('click', (e) => {
    console.log(btnbyProject.textContent);
    console.log(e.target.innerText);
  });
});
