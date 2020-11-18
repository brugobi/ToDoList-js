import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import toDoForm from './todoform';
import projectForm from './projectForm';

const arrayOfTasks = [];
const arrayProject = [];

const todoConstructor = (title, description, project, duedate, priority) => {
  const isDone = false;
  return {
    title,
    description,
    project,
    duedate,
    priority,
    isDone,
  };
};

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

const newTodoBtn = document.getElementById('newTodoFormBtn');
newTodoBtn.addEventListener('click', () => {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = toDoForm;
  let newTodo = {};
  const formSubmit = document.getElementById('submit-todo-form');

  formSubmit.addEventListener('click', () => {
    const todoTitle = document.getElementById('todoTitle');
    const todoDescription = document.getElementById('todoDescription');
    const selectProject = document.getElementById('selectProject');
    const todoDueDate = document.getElementById('todoDueDate');
    const todoPriority = document.getElementById('todoPriority');

    console.log(todoTitle);
    newTodo = todoConstructor(
      todoTitle.value,
      todoDescription.value,
      selectProject.value,
      todoDueDate.value,
      todoPriority.checked,
    );
    arrayOfTasks.push(newTodo);
    modalContainer.innerHTML = '';
    displayTasks(arrayOfTasks);
  });
  document.querySelectorAll('#delete-todo-modal').forEach(item => {
    item.addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });
  });
});

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = projectForm;
  const submitProjectbtn = document.getElementById('submit-project-form');
  submitProjectbtn.addEventListener('click', () => {
    const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
    if (!arrayProject.includes(projectTitle)) {
      arrayProject.push(projectTitle);
    }
    modalContainer.innerHTML = '';
  });
  document.querySelectorAll('#close-project-modal').forEach(item => {
    item.addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });
  });
});

// document.querySelectorAll('#delete-todo-modal').forEach(item => {
//   item.addEventListener('click', () => {
//     const modal = document.getElementById('todo-modal-form');
//     modal.classList.toggle('is-active');
//   });
// });

document.querySelectorAll('#close-project-modal').forEach(item => {
  item.addEventListener('click', () => {
    const modal = document.getElementById('project-modal-form');
    modal.classList.toggle('is-active');
  });
});

// document.getElementById('submit-todo-form').addEventListener('click', () => {
//   const modal = document.getElementById('todo-modal-form');
//   modal.classList.toggle('is-active');
// });

// document.getElementById('submit-project-form').addEventListener('click', () => {
//   const modal = document.getElementById('project-modal-form');
//   modal.classList.toggle('is-active');
// });