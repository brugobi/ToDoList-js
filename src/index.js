import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import {
  createProjectForm,
  createTodoForm,
  displayAllTasks,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
}
  from './functions';

const arrayOfProjects = ['hello', 'world'];
let arrayOfTasks = [
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false, id: 1,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false, id: 2,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false, id: 3,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false, id: 4,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-11-20T00:00', priority: true, project: 'hello', isDone: false, id: 5,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-11-20T03:30', priority: true, project: 'hello', isDone: false, id: 6,
  },
];
function addEventListenerByClass(className, event, fn) {
  const list = document.getElementsByClassName(className);
  for (let i = 0, len = list.length; i < len; i += 1) {
    list[i].addEventListener(event, fn);
  }
}
const newTodoBtn = document.getElementById('newTodoFormBtn');
newTodoBtn.addEventListener('click', () => {
  createTodoForm(arrayOfTasks, arrayOfProjects);
});

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
  createProjectForm(arrayOfProjects);
});


const btnAllTasks = document.getElementById('btnAllTasks');
btnAllTasks.addEventListener('click', () => {
  displayAllTasks(arrayOfTasks);
  addEventListenerByClass('delete', 'click', (e) => {
    arrayOfTasks = deleteTodoObjFromArray(arrayOfTasks, e.target.id);
    deleteTodoHTML(e.target);
    return arrayOfTasks;
  });
});

const btnTodayTasks = document.getElementById('btnTodayTasks');
btnTodayTasks.addEventListener('click', () => {
  displayTasksforToday(arrayOfTasks);
  addEventListenerByClass('delete', 'click', (e) => {
    arrayOfTasks = deleteTodoObjFromArray(arrayOfTasks, e.target.id);
    deleteTodoHTML(e.target);
    return arrayOfTasks;
  });
});
