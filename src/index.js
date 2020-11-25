import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import {
  displayProjectModal,
  displayToDoModal,
  displayAllTasks,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
  loadProjects,
  displaybyProject,
  displayTasksbyWeek,
  toggleActiveBtns,
}
  from './functions';

if (localStorage.getItem('arrayOfProjects') === null) {
  localStorage.setItem('arrayOfProjects', JSON.stringify(['hello', 'world']));
}
let arrayOfTodos = [];
if (localStorage.getItem('arrayOfTodos') !== null) {
  arrayOfTodos = JSON.parse(localStorage.getItem('arrayOfTodos'));
} else {
  localStorage.setItem('arrayOfTodos', JSON.stringify([{
    title: 'I have priority', description: 'Lorem', duedate: '2020-11-23T01:00:00.000', priority: true, project: 'hello', isDone: false, id: 1,
  }, {
    title: 'I have priority', description: 'ipsum', duedate: '2020-11-26T16:00:00.000', priority: true, project: 'hello', isDone: false, id: 2,
  }, {
    title: 'I have priority', description: 'sit', duedate: '2020-11-26T18:00:00.000', priority: true, project: 'hello', isDone: false, id: 3,
  }, {
    title: 'I have priority', description: 'amet', duedate: '2020-11-26T21:00:00.000', priority: true, project: 'world', isDone: false, id: 4,
  }, {
    title: 'I have priority', description: 'Something', duedate: '2020-11-26T23:00:00.000', priority: true, project: 'world', isDone: false, id: 5,
  }, {
    title: 'I have no priority', description: 'Lorem', duedate: '2020-11-26T23:45:00.000', priority: false, project: 'world', isDone: false, id: 6,
  }, {
    title: 'I have no priority', description: 'Ipsum', duedate: '2020-11-21T01:00:00.000', priority: false, project: 'hello', isDone: false, id: 7,
  }]));
  arrayOfTodos = JSON.parse(localStorage.getItem('arrayOfTodos'));
}

const addEventListenerByClass = (className, event, fn) => {
  const list = document.getElementsByClassName(className);
  for (let i = 0, len = list.length; i < len; i += 1) {
    list[i].addEventListener(event, fn);
  }
};

const newTodoBtn = document.getElementById('newTodoFormBtn');
newTodoBtn.addEventListener('click', () => {
  displayToDoModal();
});

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
  displayProjectModal();
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

const btnWeekTasks = document.getElementById('btnWeekTasks');
btnWeekTasks.addEventListener('click', () => {
  displayTasksbyWeek();
});

const btnbyProject = document.getElementById('aside-project-list');
btnbyProject.addEventListener('click', (e) => {
  displaybyProject(e.target.innerText);
});

displayAllTasks();
loadProjects();
toggleActiveBtns();
