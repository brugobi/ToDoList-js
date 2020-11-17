import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import toDoForm from './todoform';
import projectForm from './projectForm';

function displayTasks(array) {
  const todoDisplay = document.getElementById('todoDisplay');
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
newTodoBtn.addEventListener('click', (event) => {
  const mainContainer = document.getElementById('modalContainer');
  mainContainer.innerHTML += `${toDoForm}`;
  const formSubmit = document.getElementById('submit-todo-form');

  formSubmit.addEventListener('click', (event) => {
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

  console.log(document.querySelectorAll('#delete-modal'));

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
  submitProjectbtn.addEventListener('click', (e) => {
    const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
    if (!arrayProject.includes(projectTitle)) {
      arrayProject.push(projectTitle);
    }
    console.log(arrayProject);
    mainContainer.innerHTML = '';
  });
  document.querySelectorAll('#delete-modal').forEach(item => {
    item.addEventListener('click', () => {
      mainContainer.innerHTML = '';
    });
  });
});