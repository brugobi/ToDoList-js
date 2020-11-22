import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';
import { format, formatDistanceToNow, getTime, isBefore } from 'date-fns';

const customIsDoneCheckBox = `
<div class="switch_box box_4">
  <div class="input_wrapper">
    <input id="isDoneCheckBox" type="checkbox" class="switch_4">
    <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
      <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
    </svg>
    <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
      <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
    </svg>
  </div>
</div>
`;
const customCheckBox = `
<div class="switch_box box_4">
  <div class="input_wrapper">
    <input id="todoPriority" type="checkbox" class="switch_4">
    <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
      <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
    </svg>
    <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
      <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
    </svg>
  </div>
</div>
`;
const projectForm = `
<div id="project-modal-form"class="modal is-active is-clipped">
<div class="modal-background" id="delete-todo-modal"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Project</p>
      <button id="close-project-modal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="container is-max-desktop">
          <div class="field">
            <label class="label">Project Title</label>
            <div class="control">
            <input id="projectTitle" class="input" type="text" placeholder="ProjectTitle">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button id="submit-project-form" class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button id="close-project-modal" class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
`;
const firstPart = `
<div id="todo-modal-form" class="modal is-active is-clipped">
  <div class="modal-background" id="delete-todo-modal"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add a new To Do:</p>
      <button id="delete-todo-modal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div id="form" class="container is-max-desktop">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input id="todoTitle" class="input" type="text" placeholder="Title" required>
          </div>
        </div>
        <div id="fieldProjects" class="field">
          <label class="label">Pick a Project</label>
          <div class="control">
            <div class="select">`;
const lastPart = `
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea id="todoDescription" class="textarea" placeholder="Description..."></textarea>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Due Date & Time</label>
              <div class="control bulma-calendar">
                <input id="todoDueDate" type="datetime">
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">Priority</label>
            ${customCheckBox}
          </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button id="submit-todo-form" class="button is-success">Save changes</button>
      <button id="delete-todo-modal" class="button">Cancel</button>
    </footer>
  </div>
</div>`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const appendProjectsToTodoForm = (projects) => {
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

function createTodoForm(arrayProjects) {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `${firstPart}${appendProjectsToTodoForm(arrayProjects).innerHTML}${lastPart}`;
  document.getElementById('todoTitle').focus();

  bulmaCalendar.attach('[type="datetime"]', {
    displayMode: 'inline',
    dateFormat: 'DD/MM/YYYY',
    clearButton: false,
    showHeader: false,
    showFooter: false,
    startDate: new Date(),
  });
}

function displayTasks(array) {
  const todoDisplay = document.getElementById('todoDisplay');
  todoDisplay.innerHTML = `
  <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Due Date</th>
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
        td.innerHTML = customIsDoneCheckBox;
        tr.append(td);
      } else if (key === 'duedate') {
        const td = document.createElement('td');
        if (isBefore(new Date(object[key]), new Date())) {
          td.innerText = 'Past Due!';
        } else {
          td.innerText = capitalizeFirstLetter(
            formatDistanceToNow(new Date(object[key]), { addSuffix: true }),
          );
        }
        td.title = format(new Date(object[key]), 'dddd do MMMM yyyy');
        tr.append(td);
      } else if (key !== 'id' && key !== 'priority') {
        td.innerText = capitalizeFirstLetter(object[key]);
        tr.append(td);
      }
    });
    const deleteBtn = document.createElement('a');
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('id', `${object.id}`);
    const td = document.createElement('td');
    td.appendChild(deleteBtn);
    tr.append(td);
    tr.setAttribute('id', `${object.id}`);
    todoDisplay.append(tr);
  });
}

function closeModal(e) {
  e.stopPropagation();
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = '';
}

export {
  createTodoForm,
  closeModal,
  projectForm,
  displayTasks,
};