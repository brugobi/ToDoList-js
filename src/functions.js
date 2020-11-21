import {
  format,
  formatDistance,
  formatRelative,
  subDays,
} from 'date-fns';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';

import { firstPart, lastPart, projectForm } from './DOM';

const fetchArrayFromLocalHost = () => {
  const todoArray = JSON.parse(localStorage.getItem('arrayOfTasks') || '[]');
  return todoArray;
};

const saveArrayInLocalHost = (todoArray) => {
  localStorage.setItem('arrayOfTasks', JSON.stringify(todoArray));
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
  const array = JSON.parse(localStorage.getItem('arrayOfTasks') || '[]');
  displayTasks(array);
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
  const array = fetchArrayFromLocalHost();
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
      todoDueDate.bulmaCalendar.date.start,
      todoPriority.checked,
      selectProject.value,
      lastId(todoArray),
    );
    if (todoArray === undefined) {
      todoArray = [];
    }
    console.log(newTodo);
    todoArray.push(newTodo);
    modalContainer.innerHTML = '';
  });
  const calendars = bulmaCalendar.attach('[type="date"]', { displayMode: 'inline', dateFormat: 'DD/MM/YYYY', clearButton: false, showHeader: false, showFooter: false });
  calendars.forEach(calendar => {
    calendar.on('select', date => {
      console.log(date);
    });
  });
  const element = document.querySelector('#todoDueDate');
  if (element) {
    // bulmaCalendar instance is available as element.bulmaCalendar
    element.bulmaCalendar.datePicker.on('select', (datepicker) => {
      console.log(datepicker.data.value());
    });
  }
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