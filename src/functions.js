import {
  format,
} from 'date-fns';


import {
  createTodoForm, closeModal, projectForm, displayTasks, displayProjects,
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

function deleteTodo(e, callback) {
  const todoArray = fetchTodoArrayFromLocalStorage()
    .filter(object => object.id !== parseInt(e.target.id, 10));
  saveTodoArrayInLocalStorage(todoArray);
  callback();
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

function createProjectForm(globalArray) {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = projectForm;
  document.getElementById('projectTitle').focus();
  const submitProjectbtn = document.getElementById('submit-project-form');
  submitProjectbtn.addEventListener('click', () => {
    const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
    if (!globalArray.includes(projectTitle)) {
      globalArray.push(projectTitle);
    }
    const ul = document.getElementById('aside-project-list');
    const li = document.createElement('li');
    li.setAttribute('id', 'btnbyProject');
    const a = document.createElement('a');
    a.innerText = projectTitle;
    li.append(a);
    ul.append(li);

    modalContainer.innerHTML = '';
  });
  document.querySelectorAll('#close-project-modal').forEach(item => {
    item.addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });
  });
}

function changeIsDoneStatus(e, value, callback) {
  const array = fetchTodoArrayFromLocalStorage();
  const pos = array.findIndex(obj => obj.id === parseInt(e.target.closest('tr').id, 10));
  array[pos].isDone = value;
  saveTodoArrayInLocalStorage(array);
  setTimeout(() => {
    callback();
  }, 500);
}

function loadProjects() {
  const arrayOfProjects = fetchProjectArrayFromLocalStorage();
  displayProjects(arrayOfProjects);
}

function displayAllTasks() {
  const todoArray = fetchTodoArrayFromLocalStorage();
  displayTasks(todoArray);
  document.querySelectorAll('.delete').forEach(item => {
    item.addEventListener('click', (e) => { deleteTodo(e, displayAllTasks); });
  });
  document.querySelectorAll('#isDoneCheckBox').forEach(item => {
    item.addEventListener('click', (e) => {
      changeIsDoneStatus(e, e.target.checked, displayAllTasks);
    });
  });
}

function displaybyProject(string) {
  const arrayTodo = fetchTodoArrayFromLocalStorage();
  const arrayProjects = [];
  const parent = document.getElementById('aside-project-list');
  for (let i = 0; i < arrayTodo.length; i += 1) {
    if (arrayTodo[i].project === string) {
      arrayProjects.push(arrayTodo[i]);
    }
  }
  displayTasks(arrayProjects);
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
    selectProject.value,
    lastId(todosArray),
  );
  if (todosArray === undefined) {
    todosArray = [];
  }
  console.log(todoDueDate.bulmaCalendar);
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
  document.querySelectorAll('#delete-todo-modal').forEach(item => {
    item.addEventListener('click', e => { closeModal(e); });
  });
}

export {
  createProjectForm,
  displayToDoModal,
  displayTasks,
  displayAllTasks,
  displaybyProject,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
  loadProjects,
};