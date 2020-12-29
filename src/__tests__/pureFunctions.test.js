import {
  fetchTodoArrayFromLocalStorage,
  fetchProjectArrayFromLocalStorage,
  saveTodoArrayInLocalStorage,
  saveProjectArrayInLocalStorage,
  deleteTodoObjFromArray,
  capitalizeFirstLetter,
  lastId,
} from '../pureFunctions';

localStorage.setItem('arrayOfTodos', JSON.stringify([{
  title: 'I have priority', description: 'Lorem', duedate: '2020-11-23T01:00:00.000', priority: true, project: 'hello', isDone: false, id: 1,
}, {
  title: 'I have priority', description: 'ipsum', duedate: '2020-11-26T16:00:00.000', priority: true, project: 'hello', isDone: false, id: 2,
}]));

test('Return Todos Array from local storage', () => {
  expect(fetchTodoArrayFromLocalStorage()).toHaveLength(2);
  expect(Array.isArray(fetchTodoArrayFromLocalStorage())).toBe(true);
  expect(fetchTodoArrayFromLocalStorage()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ title: 'I have priority' }),
      expect.objectContaining({ priority: true }),
      expect.objectContaining({ project: 'hello' }),
      expect.objectContaining({ isDone: false }),
    ]),
  );
});

test('Return Projects Array from local storage', () => {
  localStorage.setItem('arrayOfProjects', JSON.stringify(['hello', 'hi', 'hey']));

  expect(fetchProjectArrayFromLocalStorage()).toHaveLength(3);
  expect(Array.isArray(fetchProjectArrayFromLocalStorage())).toBe(true);
  expect(fetchProjectArrayFromLocalStorage()).toEqual(
    expect.arrayContaining(['hello']),
    expect.arrayContaining(['hi']),
    expect.arrayContaining(['hey']),
  );
});

test('Delete Todo object from Array by id', () => {
  expect(deleteTodoObjFromArray(fetchTodoArrayFromLocalStorage(), 1)).toHaveLength(1);
  expect(fetchTodoArrayFromLocalStorage()).toEqual(
    expect.arrayContaining([
      expect.not.objectContaining({ id: 1 }),
      expect.not.objectContaining({ description: 'Lorem' }),
    ]),
  );
});

test('Get the biggest ID from the Todo Array of objects and increment it by 1', () => {
  expect(lastId(fetchTodoArrayFromLocalStorage())).toBe(2);
});

test('Capitalize first letter of a string', () => {
  expect(capitalizeFirstLetter('hello')).toBe('Hello');
});

describe('Takes an array of objects. Orders them and saves it to localStorage', () => {
  test('The array is saved correctly in LocalStorage', () => {
    const todoArray = [{
      title: 'I have priority',
      description: 'Lorem',
      duedate:
      '2020-11-23T01:00:00.000',
      priority: true,
      project: 'hello',
      isDone: false,
      id: 1,
    }];
    saveTodoArrayInLocalStorage(todoArray);
    const todoArrayFromLocalStorage = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
    expect(todoArrayFromLocalStorage).toEqual(todoArray);
  });

  test('The array objects are ordered first by its Priority status', () => {
    const todoArray = [{
      title: 'I have priority',
      description: 'Lorem',
      duedate:
      '2020-11-23T01:00:00.000',
      priority: false,
      project: 'hello',
      isDone: false,
      id: 1,
    },
    {
      title: 'I have priority',
      description: 'ipsum',
      duedate: '2020-11-26T16:00:00.000',
      priority: false,
      project: 'hello',
      isDone: false,
      id: 2,
    },
    {
      title: 'I\'m completed',
      description: 'ipsum',
      duedate: '2020-11-26T16:00:00.000',
      priority: true,
      project: 'hello',
      isDone: false,
      id: 3,
    }];
    saveTodoArrayInLocalStorage(todoArray);
    const todoArrayFromLocalStorage = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
    expect(todoArrayFromLocalStorage[0].id).toEqual(3);
  });

  test('The array objects are ordered last by its Completion (isDone) status', () => {
    const todoArray = [{
      title: 'I have priority',
      description: 'Lorem',
      duedate:
      '2020-11-23T01:00:00.000',
      priority: true,
      project: 'hello',
      isDone: true,
      id: 1,
    },
    {
      title: 'I have priority',
      description: 'ipsum',
      duedate: '2020-11-26T16:00:00.000',
      priority: true,
      project: 'hello',
      isDone: false,
      id: 2,
    },
    {
      title: 'I\'m completed',
      description: 'ipsum',
      duedate: '2020-11-26T16:00:00.000',
      priority: true,
      project: 'hello',
      isDone: false,
      id: 3,
    }];
    saveTodoArrayInLocalStorage(todoArray);
    const todoArrayFromLocalStorage = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
    expect(todoArrayFromLocalStorage[todoArrayFromLocalStorage.length - 1].id).toEqual(1);
  });

  test('The array objects without Priority or Finished status are in the middle of the Array.', () => {
    const todoArray = [{
      title: 'I have priority',
      description: 'Lorem',
      duedate:
      '2020-11-23T01:00:00.000',
      priority: false,
      project: 'hello',
      isDone: false,
      id: 1,
    },
    {
      title: 'I have priority',
      description: 'ipsum',
      duedate: '2020-11-26T16:00:00.000',
      priority: true,
      project: 'hello',
      isDone: false,
      id: 2,
    },
    {
      title: 'I\'m completed',
      description: 'ipsum',
      duedate: '2020-11-26T16:00:00.000',
      priority: true,
      project: 'hello',
      isDone: true,
      id: 3,
    }];
    saveTodoArrayInLocalStorage(todoArray);
    const todoArrayFromLocalStorage = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
    expect(todoArrayFromLocalStorage[1].id).toEqual(1);
  });
});

describe('Takes an array of Strings and saves it to localStorage', () => {
  test('The array is saved correctly in LocalStorage', () => {
    const projectsArray = ['hello', 'world'];
    saveProjectArrayInLocalStorage(projectsArray);
    const projectsArrayFromLocalStorage = JSON.parse(localStorage.getItem('arrayOfProjects') || '[]');
    expect(projectsArrayFromLocalStorage).toEqual(projectsArray);
  });
});