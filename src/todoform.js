//import { arrayProject } from './index';

function createEl(type, cl = '') {
  const el = document.createElement(type);
  if (cl !== '') {
    el.classList += cl;
  }
  return el;
}

const newProject = () => {
  const arrayProject = [];
  const controlDiv = document.createElement('div');
  controlDiv.classList.add('control');
  const selectDiv = document.createElement('div');
  selectDiv.classList.add('select');
  controlDiv.appendChild(selectDiv);
  const select = document.createElement('select');
  select.setAttribute('id', 'selectProject');
  selectDiv.appendChild(select);

  arrayProject.forEach(element => {
    const option = document.createElement('option');
    select.appendChild(option);
  });

  const fieldDiv = document.getElementById('fieldProjects');
  fieldDiv.appendChild(controlDiv);
};

const toDoForm = ``;

newProject();
export default toDoForm;