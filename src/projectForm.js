const projectForm = `
<div id="project-modal-form"class="modal is-active is-clipped">
<div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
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

export default projectForm;
