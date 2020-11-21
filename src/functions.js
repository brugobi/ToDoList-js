import {
  format,
  formatDistance,
  formatRelative,
  subDays,
} from 'date-fns';


import { createTodoForm, closeModal, projectForm } from './DOM';

const fetchTodoArrayFromLocalHost = () => {
  const todoArray = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
  return todoArray;
};
const fetchProjectArrayFromLocalHost = () => {
  const projectsArray = JSON.parse(localStorage.getItem('arrayOfProjects') || '[]');
  return projectsArray;
};

const saveTodoArrayInLocalHost = (todoArray) => {
  localStorage.setItem('arrayOfTodos', JSON.stringify(todoArray));
};
const saveProjectArrayInLocalHost = (projectsArray) => {
  localStorage.setItem('arrayOfProjects', JSON.stringify(projectsArray));
};

function deleteTodoObjFromArray(array, domId) {
  const newArray = array.filter(object => object.id !== parseInt(domId, 10));
  return newArray;
}

function deleteTodoHTML(target) {
  target.parentNode.parentNode.remove();
}

function changeIsDone(event) {
  console.log(event);
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

function displayTasks(array) {
  const todoDisplay = document.getElementById('todoDisplay');
  todoDisplay.innerHTML = `
  <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Due Date</th>
    <th>Priority</th>
    <th>Project</th>
    <th>It is Done?</th>
    <th></th>
  </tr>`;
  if (array === undefined || array.length === 0) {
    return array;
  }
  array.forEach((object) => {
    const tr = document.createElement('tr');
    Object.keys(object).forEach((key) => {
      const td = document.createElement('td');
      if (key === 'isDone') {
        const td = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'btncheckbox');
        checkbox.setAttribute('onclick', 'changeIsDone(event)');
        td.append(checkbox);
        tr.append(td);
      } else if (key !== 'id') {
        td.innerText = object[key];
        tr.append(td);
      }
    });

    const deleteBtn = document.createElement('a');
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('id', `${object.id}`);
    const td = document.createElement('td');
    td.appendChild(deleteBtn);
    tr.append(td);

    todoDisplay.append(tr);
  });
  return array;
}

function displayAllTasks() {
  displayTasks(fetchTodoArrayFromLocalHost());
}

function loadProjects(arrayOfProjects) {
  const ul = document.getElementById('aside-project-list');
  arrayOfProjects.forEach(project => {
    const li = document.createElement('li');
    ul.appendChild(li);
    const a = document.createElement('a');
    a.setAttribute('id', 'btnbyProject');
    li.appendChild(a);
    a.innerHTML = project;
  });
}

function displaybyProject(array) {
  // if (array === undefined || array.length === 0) {
  //   return array;
  // }
  // const parent = document.getElementById('aside-project-list');
  // const arraybyProject = [];
  // for (let i = 0; i < array.length; i += 1) {
  //   const child = parent.childNodes[i];
  //   if (array[i].project === child.textContent) {
  //     arraybyProject.push(array[i]);
  //   }
  // }
  // displayTasks(arraybyProject);
  // return array;
  const btnbyProject = document.getElementById('btnbyProject');
  console.log(btnbyProject);
}

function displayTasksforToday() {
  const array = fetchTodoArrayFromLocalHost();
  if (array === undefined || array.length === 0) {
    return array;
  }
  const date = `${format(new Date(), 'yyyy-M-d')}`;
  const arrayTodayTask = [];
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].duedate.includes(date)) {
      arrayTodayTask.push(array[i]);
    }
  }
  displayTasks(arrayTodayTask);
  return array;
}

function submitTodoForm() {
  let newTodo = {};
  let todosArray = fetchTodoArrayFromLocalHost();
  const todoTitle = document.getElementById('todoTitle');
  const todoDescription = document.getElementById('todoDescription');
  const selectProject = document.getElementById('selectProject');
  const todoDueDate = document.getElementById('todoDueDate');
  const todoPriority = document.getElementById('todoPriority');

  newTodo = todoConstructor(
    todoTitle.value,
    todoDescription.value,
    todoDueDate.bulmaCalendar.date.start,
    todoPriority.checked,
    selectProject.value,
    lastId(todosArray),
  );
  if (todosArray === undefined) {
    todosArray = [];
  }
  console.log(newTodo);
  todosArray.push(newTodo);
  saveTodoArrayInLocalHost(todosArray);
  closeModal();
}

function displayToDoModal(e) {

  createTodoForm(fetchProjectArrayFromLocalHost());
  console.log(fetchProjectArrayFromLocalHost());
  // const formSubmit = document.getElementById('submit-todo-form');
  // console.log(formSubmit.bubbles);
  // formSubmit.addEventListener('click', (e) => {
  //   console.log(e);
  //   e.preventDefault();
  //   submitTodoForm();
  // });
  // document.querySelectorAll('#delete-todo-modal').forEach(item => {
  //   item.addEventListener('click', closeModal());
  // });
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