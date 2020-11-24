import {
  format,
  isSameWeek,
} from 'date-fns';


import {
  createTodoForm,
  closeModal,
  displayTasks,
  createProjectForm,
  appendProjectsToMenu,
} from './DOM';

function sortDates(array) {
  return array.sort((a, b) => {
    if (a.duedate < b.duedate) {
      return -1;
    }
    if (a.duedate > b.duedate) {
      return 1;
    }
    return 0;
  });
}

function orderTodoArray(todoArray) {
  let priorityTodo = [];
  let noPriorityTodo = [];
  let doneTodo = [];
  todoArray.forEach((object) => {
    if (object.isDone === true) {
      doneTodo.push(object);
    } else if (object.priority === true) {
      priorityTodo.push(object);
    } else {
      noPriorityTodo.push(object);
    }
  });
  priorityTodo = sortDates(priorityTodo);
  noPriorityTodo = sortDates(noPriorityTodo);
  doneTodo = sortDates(doneTodo);
  return priorityTodo.concat(noPriorityTodo, doneTodo);
}

const fetchTodoArrayFromLocalStorage = () => {
  const todoArray = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
  return todoArray;
};
const fetchProjectArrayFromLocalStorage = () => {
  const projectsArray = JSON.parse(localStorage.getItem('arrayOfProjects') || '[]');
  return projectsArray;
};

const saveTodoArrayInLocalStorage = (todoArray) => {
  const orderedArray = orderTodoArray(todoArray);
  localStorage.setItem('arrayOfTodos', JSON.stringify(orderedArray));
};
const saveProjectArrayInLocalStorage = (projectsArray) => {
  localStorage.setItem('arrayOfProjects', JSON.stringify(projectsArray));
};

function deleteTodoObjFromArray(array, domId) {
  const newArray = array.filter(object => object.id !== parseInt(domId, 10));
  return newArray;
}

function deleteTodo(e, callback, args) {
  const todoArray = fetchTodoArrayFromLocalStorage()
    .filter(object => object.id !== parseInt(e.target.id, 10));
  saveTodoArrayInLocalStorage(todoArray);
  callback(args);
}
function changeIsDoneStatus(e, value, callback, args) {
  const array = fetchTodoArrayFromLocalStorage();
  const pos = array.findIndex(obj => obj.id === parseInt(e.target.closest('tr').id, 10));
  array[pos].isDone = value;
  saveTodoArrayInLocalStorage(array);
  setTimeout(() => {
    callback(args);
  }, 500);
}

function deleteTodoHTML(target) {
  target.parentNode.parentNode.remove();
}

function lastId(todosArray) {
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
}

const todoConstructor = (title, description, duedate, priority, project, id) => {
  const isDone = false;
  id += 1;
  return {
    title,
    description,
    duedate,
    priority,
    project,
    isDone,
    id,
  };
};

function toggleActiveBtns() {
  const btns = document.getElementsByClassName('side-menu-btn');
  for (let i = 0; i < btns.length; i += 1) {
    btns[i].addEventListener('click', () => {
      const current = document.getElementsByClassName('is-active');
      current[0].className = current[0].className.replace(' is-active', '');
      btns[i].className += ' is-active';
    });
  }
}

function submitProjectForm(e) {
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
}

function displayProjectModal() {
  createProjectForm();

  const submitProjectbtn = document.getElementById('submit-project-form');
  submitProjectbtn.addEventListener('click', (e) => {
    submitProjectForm(e);
  });
  document.querySelectorAll('#delete-modal').forEach(item => {
    item.addEventListener('click', e => { closeModal(e); });
  });
}

function loadProjects() {
  appendProjectsToMenu(fetchProjectArrayFromLocalStorage());
}

function todoListenerDelete(listToRefresh, args) {
  document.querySelectorAll('.delete').forEach(item => {
    item.addEventListener('click', (e) => { deleteTodo(e, listToRefresh, args); });
  });
}

function todoListenerIsDone(listToRefresh, args) {
  document.querySelectorAll('#isDoneCheckBox').forEach(item => {
    item.addEventListener('click', (e) => {
      changeIsDoneStatus(e, e.target.checked, listToRefresh, args);
    });
  });
}

function displayAllTasks() {
  const todoArray = fetchTodoArrayFromLocalStorage();
  displayTasks(todoArray);
  todoListenerDelete(displayAllTasks);
  todoListenerIsDone(displayAllTasks);
}


function displaybyProject(string) {
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
}

function displayTasksforToday() {
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
}

function displayTasksbyWeek() {
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
}

function submitTodoForm(e) {
  let newTodo = {};
  let todosArray = fetchTodoArrayFromLocalStorage();
  const todoTitle = document.getElementById('todoTitle');
  const todoDescription = document.getElementById('todoDescription');
  const selectProject = document.getElementById('selectProject');
  const todoDueDate = document.getElementById('todoDueDate');
  const todoPriority = document.getElementById('todoPriority');
  const date = new Date(`${format(todoDueDate.bulmaCalendar.date.start, 'yyyy-M-d')}T${format(todoDueDate.bulmaCalendar.time.start, 'HH:mm')}`);
  newTodo = todoConstructor(
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
}

function displayToDoModal() {
  createTodoForm(fetchProjectArrayFromLocalStorage());
  const formSubmit = document.getElementById('submit-todo-form');
  formSubmit.addEventListener('click', (e) => {
    submitTodoForm(e);
  });
  document.querySelectorAll('#delete-modal').forEach(item => {
    item.addEventListener('click', e => { closeModal(e); });
  });
}

export {
  displayProjectModal,
  displayToDoModal,
  displayTasks,
  displayAllTasks,
  displayTasksbyWeek,
  displaybyProject,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
  loadProjects,
  toggleActiveBtns,
};