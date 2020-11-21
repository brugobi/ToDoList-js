import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';
// function createEl(type, cl = '') {
//   const el = document.createElement(type);
//   if (cl !== '') {
//     el.classList += cl;
//   }
//   return el;
// }
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

function createTodoForm(arrayProjects) {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `${firstPart}${appendProjectsToProjectForm(arrayProjects).innerHTML}${lastPart}`;
  document.getElementById('todoTitle').focus();

  bulmaCalendar.attach('[type="date"]', {
    displayMode: 'inline',
    dateFormat: 'DD/MM/YYYY',
    clearButton: false,
    showHeader: false,
    showFooter: false,
  });
}

function closeModal() {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = '';
}

export { createTodoForm, closeModal, projectForm };