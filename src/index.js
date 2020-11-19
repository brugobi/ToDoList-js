import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { createProjectForm, createTodoForm, displayTasks } from './functions';

const arrayOfProjects = ['hello', 'world'];
const arrayOfTasks = [
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
  {
    title: 'ASD', description: 'ASD', duedate: '2020-01-01T00:00', priority: true, project: 'hello', isDone: false,
  },
];

displayTasks(arrayOfTasks);

const newTodoBtn = document.getElementById('newTodoFormBtn');
newTodoBtn.addEventListener('click', () => {
  createTodoForm(arrayOfTasks, arrayOfProjects);
});

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
  createProjectForm(arrayOfProjects);
});
