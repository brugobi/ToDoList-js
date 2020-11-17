const toDoForm = `<div class="modal is-active is-clipped">
<div class="modal-background"></div>
<div class="modal-card">
  <header class="modal-card-head">
    <p class="modal-card-title">Modal title</p>
    <button id="delete-modal" class="delete" aria-label="close"></button>
  </header>
  <section class="modal-card-body">
    <div id="form" class="container is-max-desktop">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input id="todoTitle" class="input" type="text" placeholder="Title">
        </div>
      </div>
      <div class="field">
        <label class="label">Project</label>
        <div class="control">
          <div class="select">
            <select id="selectProject">
              <option>Projects</option>
              <option>Add a new project</option>
            </select>
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
              <input id="todoDueDate" class="input" type="datetime-local" placeholder="Pick a Date">
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
    <button id="delete-modal" class="button">Cancel</button>
  </footer>
</div>
</div>`

export default toDoForm;