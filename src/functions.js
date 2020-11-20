import {
  format,
  formatDistance,
  formatRelative,
  subDays,
} from 'date-fns';

import { firstPart, lastPart, projectForm } from './DOM';

function deleteTodoObjFromArray(array, domId) {
  const newArray = array.filter(object => object.id !== parseInt(domId, 10));
  return newArray;
}

function deleteTodoHTML(target) {
  target.parentNode.parentNode.remove();
}

function lastId(array) {
  let biggestID = 0;
  if (array === undefined || array.length === 0) {
    biggestID = 1;
  } else {
    array.forEach((object) => {
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

const appendProjectsToProjectForm = (projects) => {
  const wrapper = document.createElement('div');
  const select = document.createElement('select');
  select.setAttribute('id', 'selectProject');

  projects.forEach((element) => {
    const option = document.createElement('option');
    option.innerText = element;
    select.appendChild(option);
  });

  wrapper.appendChild(select);
  return wrapper;
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

function displayAllTasks(array) {
  displayTasks(array);
  return array;
};

//const arrayOfProjects = ['hello', 'world'];
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
};

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
};

function displayTasksforToday(array) {
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

function createTodoForm(todoArray, arrayProjects) {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `${firstPart}${appendProjectsToProjectForm(arrayProjects).innerHTML}${lastPart}`;
  document.getElementById('todoTitle').focus();
  let newTodo = {};
  const formSubmit = document.getElementById('submit-todo-form');

  formSubmit.addEventListener('click', () => {
    const todoTitle = document.getElementById('todoTitle');
    const todoDescription = document.getElementById('todoDescription');
    const selectProject = document.getElementById('selectProject');
    const todoDueDate = document.getElementById('todoDueDate');
    const todoPriority = document.getElementById('todoPriority');

    newTodo = todoConstructor(
      todoTitle.value,
      todoDescription.value,
      todoDueDate.value,
      todoPriority.checked,
      selectProject.value,
      lastId(todoArray),
    );
    if (todoArray === undefined) {
      todoArray = [];
    }
    todoArray.push(newTodo);
    modalContainer.innerHTML = '';
  });
  document.querySelectorAll('#delete-todo-modal').forEach(item => {
    item.addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });
  });
}

export {
  createProjectForm,
  createTodoForm,
  displayTasks,
  displayAllTasks,
  displaybyProject,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
  loadProjects,
};