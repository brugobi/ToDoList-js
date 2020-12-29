import {
  format,
  isSameWeek,
} from 'date-fns';

import Task from './taskmodule';

import {
  closeModal,
  displayTasks,
  createTodoForm,
  createProjectForm,
} from './DOM';

import {
  fetchTodoArrayFromLocalStorage,
  fetchProjectArrayFromLocalStorage,
  saveTodoArrayInLocalStorage,
  saveProjectArrayInLocalStorage,
  capitalizeFirstLetter,
} from './pureFunctions';

const appendProjectsToMenu = (arrayOfProjects) => {
  const ul = document.getElementById('aside-project-list');
  ul.innerHTML = '';
  arrayOfProjects.forEach(project => {
    const li = document.createElement('li');
    li.setAttribute('id', 'btnbyProject');
    const a = document.createElement('a');
    a.classList.add('side-menu-btn');
    a.innerText = capitalizeFirstLetter(project);
    li.append(a);
    ul.append(li);
  });
};

const deleteTodoHTML = (target) => {
  target.parentNode.parentNode.remove();
};

const toggleActiveBtns = () => {
  const btns = document.getElementsByClassName('side-menu-btn');
  for (let i = 0; i < btns.length; i += 1) {
    btns[i].addEventListener('click', () => {
      const current = document.getElementsByClassName('is-active');
      current[0].className = current[0].className.replace(' is-active', '');
      btns[i].className += ' is-active';
    });
  }
};

const deleteTodo = (e, callback, args) => {
  const todoArray = fetchTodoArrayFromLocalStorage()
    .filter(object => object.id !== parseInt(e.target.id, 10));
  saveTodoArrayInLocalStorage(todoArray);
  callback(args);
};

const todoListenerDelete = (listToRefresh, args) => {
  document.querySelectorAll('.delete').forEach(item => {
    item.addEventListener('click', (e) => { deleteTodo(e, listToRefresh, args); });
  });
};

const lastId = (todosArray) => {
  let biggestID = 0;
  if (todosArray === undefined || todosArray.length === 0) {
    biggestID = 1;
  } else {
    todosArray.forEach((object) => {
      if (object.id > biggestID) {
        biggestID = object.id;
      }
    });
  }
  return biggestID;
};

const changeIsDoneStatus = (e, value, callback, args) => {
  const array = fetchTodoArrayFromLocalStorage();
  const pos = array.findIndex(obj => obj.id === parseInt(e.target.closest('tr').id, 10));
  array[pos].isDone = value;
  saveTodoArrayInLocalStorage(array);
  setTimeout(() => {
    callback(args);
  }, 500);
};

const loadProjects = () => {
  appendProjectsToMenu(fetchProjectArrayFromLocalStorage());
};

const todoListenerIsDone = (listToRefresh, args) => {
  document.querySelectorAll('#isDoneCheckBox').forEach(item => {
    item.addEventListener('click', (e) => {
      changeIsDoneStatus(e, e.target.checked, listToRefresh, args);
    });
  });
};

const displayAllTasks = () => {
  const todoArray = fetchTodoArrayFromLocalStorage();
  displayTasks(todoArray);
  todoListenerDelete(displayAllTasks);
  todoListenerIsDone(displayAllTasks);
};

const displaybyProject = (string) => {
  string = string.toLowerCase();
  const arrayTodo = fetchTodoArrayFromLocalStorage();
  const arrayProjects = [];
  for (let i = 0; i < arrayTodo.length; i += 1) {
    if (arrayTodo[i].project === string) {
      arrayProjects.push(arrayTodo[i]);
    }
  }
  displayTasks(arrayProjects);
  todoListenerDelete(displaybyProject, string);
  todoListenerIsDone(displaybyProject, string);
};

const displayTasksforToday = () => {
  const array = fetchTodoArrayFromLocalStorage();
  const date = `${format(new Date(), 'yyyy-M-d')}`;
  const arrayTodayTask = [];
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].duedate.includes(date)) {
      arrayTodayTask.push(array[i]);
    }
  }
  displayTasks(arrayTodayTask);
  todoListenerDelete(displayTasksforToday);
  todoListenerIsDone(displayTasksforToday);
};

const displayTasksbyWeek = () => {
  const array = fetchTodoArrayFromLocalStorage();
  const arrayWeekTask = [];
  array.forEach(obj => {
    if (isSameWeek(new Date(), new Date(obj.duedate))) {
      arrayWeekTask.push(obj);
    }
  });
  displayTasks(arrayWeekTask);
  todoListenerDelete(displayTasksbyWeek);
  todoListenerIsDone(displayTasksbyWeek);
};

const submitProjectForm = (e) => {
  const arrayOfProjects = fetchProjectArrayFromLocalStorage();
  const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
  if (arrayOfProjects.includes(projectTitle) || /^ *$/.test(projectTitle)) {
    closeModal(e);
  } else if (!arrayOfProjects.includes(projectTitle)) {
    arrayOfProjects.push(projectTitle);
    closeModal(e);
    saveProjectArrayInLocalStorage(arrayOfProjects);
    appendProjectsToMenu(fetchProjectArrayFromLocalStorage());
  }
  toggleActiveBtns();
};

const submitTodoForm = (e) => {
  let newTodo = {};
  let todosArray = fetchTodoArrayFromLocalStorage();
  const todoTitle = document.getElementById('todoTitle');
  const todoDescription = document.getElementById('todoDescription');
  const selectProject = document.getElementById('selectProject');
  const todoDueDate = document.getElementById('todoDueDate');
  const todoPriority = document.getElementById('todoPriority');
  const date = new Date(`${format(todoDueDate.bulmaCalendar.date.start, 'yyyy-M-d')}T${format(todoDueDate.bulmaCalendar.time.start, 'HH:mm')}`);
  newTodo = new Task(
    todoTitle.value,
    todoDescription.value,
    date,
    todoPriority.checked,
    selectProject.value.toLowerCase(),
    lastId(todosArray),
  );
  if (todosArray === undefined) {
    todosArray = [];
  }
  todosArray.push(newTodo);
  saveTodoArrayInLocalStorage(todosArray);
  closeModal(e);
};

const displayToDoModal = () => {
  createTodoForm(fetchProjectArrayFromLocalStorage());
  const formSubmit = document.getElementById('submit-todo-form');
  formSubmit.addEventListener('click', (e) => {
    submitTodoForm(e);
  });
  document.querySelectorAll('#delete-modal').forEach(item => {
    item.addEventListener('click', e => { closeModal(e); });
  });
};

const displayProjectModal = () => {
  createProjectForm();

  const submitProjectbtn = document.getElementById('submit-project-form');
  submitProjectbtn.addEventListener('click', (e) => {
    submitProjectForm(e);
  });
  document.querySelectorAll('#delete-modal').forEach(item => {
    item.addEventListener('click', e => { closeModal(e); });
  });
};

export {
  deleteTodo,
  submitProjectForm,
  loadProjects,
  displayAllTasks,
  displaybyProject,
  displayTasksforToday,
  displayTasksbyWeek,
  submitTodoForm,
  displayToDoModal,
  deleteTodoHTML,
  displayProjectModal,
  toggleActiveBtns,
};