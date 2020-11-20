import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { firstPart, lastPart, projectForm } from './DOM';

const todoConstructor = (title, description, duedate, priority, project) => {
  const isDone = false;
  return {
    title,
    description,
    duedate,
    priority,
    project,
    isDone,
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


    // const spanElem = document.createElement('span');
    // spanElem.setAttribute('id', 'deleteItem');
    // spanElem.innerText = 'delete';
    // option.appendChild(spanElem);

    // spanElem.addEventListener('click', deleteItem, false);

    // function deleteItem() {
    //   this.parentNode.remove();
    // };


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
  array.forEach((object) => {
    const tr = document.createElement('tr');
    Object.keys(object).forEach((key) => {
      const td = document.createElement('td');
      if (key === 'isDone') {
        const td = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        td.append(checkbox);
        tr.append(td);
      } else {
        td.innerText = object[key];
        tr.append(td);
      }
      
    });

    //new code
    const spanElem = document.createElement('a');
    spanElem.classList.add('delete');
    spanElem.setAttribute('id', 'deleteItem');
    //spanElem.innerText = 'delete';
    const td = document.createElement('td');
    td.appendChild(spanElem)
    tr.append(td);

    spanElem.addEventListener('click', deleteItem, false);
    function deleteItem() {
      this.parentNode.parentNode.remove();
    }
    //finish
    
    todoDisplay.append(tr);
  });
}

function displayAllTasks(array) {
  displayTasks(array);
};

function displayTasksforToday(array) {
  const date = `${format(new Date(), 'yyyy-M-d')}`;
  let arrayTodayTask = [];
  for (let i = 0; i < array.length; i++) {
    //let x = array[i].duedate;
    if (array[i].duedate.includes(date)) {
      arrayTodayTask.push(array[i]);
    };
    //console.log(x);
  };
  displayTasks(arrayTodayTask);
};

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
    );
    todoArray.push(newTodo);
    modalContainer.innerHTML = '';
    displayTasks(todoArray);
  });
  document.querySelectorAll('#delete-todo-modal').forEach(item => {
    item.addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });
  });
}

export { createProjectForm, createTodoForm, displayTasks, displayAllTasks, displayTasksforToday };