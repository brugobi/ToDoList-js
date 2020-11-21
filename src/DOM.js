import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';

const projectForm = `
<div id="project-modal-form"class="modal is-active is-clipped">
<div class="modal-background"></div>
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
  <div class="modal-background"></div>
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
            <input id="todoTitle" class="input" type="text" placeholder="Title">
          </div>
        </div>
        <div id="fieldProjects" class="field">
          <label class="label">Projects</label>
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
          <div class="column is-half">
            <div class="field">
              <label class="label">Due Date</label>
              <div class="control">
                <input id="todoDueDate" type="date">
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input id="todoPriority" type="checkbox">
              Priority
            </label>
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

  bulmaCalendar.attach('[type="date"]', {
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