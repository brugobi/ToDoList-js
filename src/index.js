import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import toDoForm from './todoform';
import projectForm from './projectForm';

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
  </tr>`;
  array.forEach((object) => {
    const tr = document.createElement('tr');
    Object.keys(object).forEach((key) => {
      const td = document.createElement('td');
      if (key === 'isdone') {
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
    todoDisplay.append(tr);
  });
}

const arrayOfTasks = [];
const arrayProject = [];

const newTodoBtn = document.getElementById('newTodoFormBtn');
newTodoBtn.addEventListener('click', () => {
  const mainContainer = document.getElementById('modalContainer');
  mainContainer.innerHTML += `${toDoForm}`;
  const formSubmit = document.getElementById('submit-todo-form');

  formSubmit.addEventListener('click', () => {
    const todoTitle = document.getElementById('todoTitle');
    const selectProject = document.getElementById('selectProject');
    const todoDescription = document.getElementById('todoDescription');
    const todoDueDate = document.getElementById('todoDueDate');
    const todoPriority = document.getElementById('todoPriority');

    const newTodo = {
      title: todoTitle.value,
      description: todoDescription.value,
      duedate: todoDueDate.value,
      priority: todoPriority.checked,
      project: selectProject.value,
      isdone: false,
    };
    arrayOfTasks.push(newTodo);
    displayTasks(arrayOfTasks);
    mainContainer.innerHTML = '';
  });

  document.querySelectorAll('#delete-modal').forEach(item => {
    item.addEventListener('click', () => {
      mainContainer.innerHTML = '';
    });
  });
});

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
  const mainContainer = document.getElementById('modalContainer');
  mainContainer.innerHTML += `${projectForm}`;
  const submitProjectbtn = document.getElementById('submit-project-form');
  submitProjectbtn.addEventListener('click', () => {
    const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
    if (!arrayProject.includes(projectTitle)) {
      arrayProject.push(projectTitle);
    }
    mainContainer.innerHTML = '';
  });
  document.querySelectorAll('#delete-modal').forEach(item => {
    item.addEventListener('click', () => {
      mainContainer.innerHTML = '';
    });
  });
});