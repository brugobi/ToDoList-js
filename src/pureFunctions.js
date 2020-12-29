const sortDates = (array) => array.sort((a, b) => {
  if (a.duedate < b.duedate) {
    return -1;
  }
  if (a.duedate > b.duedate) {
    return 1;
  }
  return 0;
});

const orderTodoArray = (todoArray) => {
  let priorityTodo = [];
  let noPriorityTodo = [];
  let doneTodo = [];
  todoArray.forEach((object) => {
    if (object.isDone === true) {
      doneTodo.push(object);
    } else if (object.priority === true) {
      priorityTodo.push(object);
    } else {
      noPriorityTodo.push(object);
    }
  });
  priorityTodo = sortDates(priorityTodo);
  noPriorityTodo = sortDates(noPriorityTodo);
  doneTodo = sortDates(doneTodo);
  return priorityTodo.concat(noPriorityTodo, doneTodo);
};

const fetchTodoArrayFromLocalStorage = () => {
  const todoArray = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
  return todoArray;
};

const fetchProjectArrayFromLocalStorage = () => {
  const projectsArray = JSON.parse(localStorage.getItem('arrayOfProjects') || '[]');
  return projectsArray;
};

const saveTodoArrayInLocalStorage = (todoArray) => {
  const orderedArray = orderTodoArray(todoArray);
  localStorage.setItem('arrayOfTodos', JSON.stringify(orderedArray));
};

const saveProjectArrayInLocalStorage = (projectsArray) => {
  localStorage.setItem('arrayOfProjects', JSON.stringify(projectsArray));
};

const deleteTodoObjFromArray = (array, domId) => {
  const newArray = array.filter(object => object.id !== parseInt(domId, 10));
  return newArray;
};

const lastId = (todosArray) => {
  let biggestID = 0;
  if (todosArray === undefined || todosArray.length === 0) {
    biggestID = 1;
  } else {
    todosArray.forEach((object) => {
      if (object.id > biggestID) {
        biggestID = object.id;
      }
    });
  }
  return biggestID;
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {
  fetchTodoArrayFromLocalStorage,
  fetchProjectArrayFromLocalStorage,
  saveTodoArrayInLocalStorage,
  saveProjectArrayInLocalStorage,
  deleteTodoObjFromArray,
  capitalizeFirstLetter,
  lastId,
};