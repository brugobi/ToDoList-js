import {
  fetchTodoArrayFromLocalStorage,
  fetchProjectArrayFromLocalStorage,
  saveTodoArrayInLocalStorage,
  saveProjectArrayInLocalStorage,
  deleteTodoObjFromArray,
  capitalizeFirstLetter,
  lastId,
} from '../pureFunctions';

const todoArray = localStorage.setItem('arrayOfTodos', JSON.stringify([{
  title: 'I have priority', description: 'Lorem', duedate: '2020-11-23T01:00:00.000', priority: true, project: 'hello', isDone: false, id: 1,
}, {
  title: 'I have priority', description: 'ipsum', duedate: '2020-11-26T16:00:00.000', priority: true, project: 'hello', isDone: false, id: 2,
}]));

test('fetch TodoArray', () => {
  expect(fetchTodoArrayFromLocalStorage()).toHaveLength(2);
  expect(Array.isArray(fetchTodoArrayFromLocalStorage())).toBe(true);
  expect(fetchTodoArrayFromLocalStorage()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ title: 'I have priority' }),
      expect.objectContaining({ priority: true }),
      expect.objectContaining({ project: 'hello' }),
      expect.objectContaining({ isDone: false })
    ])
  )
});

test('fetchProjectArrayFromLocalStorage', () => {
  localStorage.setItem('arrayOfProjects', JSON.stringify(['hello', 'hi', 'hey']));

  expect(fetchProjectArrayFromLocalStorage()).toHaveLength(3);
  expect(Array.isArray(fetchProjectArrayFromLocalStorage())).toBe(true);
  expect(fetchProjectArrayFromLocalStorage()).toEqual(
    expect.arrayContaining(['hello']),
    expect.arrayContaining(['hi']),
    expect.arrayContaining(['hey'])
  );

});

//add this one
test('deleteTodoObjFromArray', () => {
  expect(deleteTodoObjFromArray(fetchTodoArrayFromLocalStorage(), 1)).toHaveLength(1);
  expect(fetchTodoArrayFromLocalStorage()).toEqual(
    expect.arrayContaining([
      expect.not.objectContaining({ id: 1 }),
      expect.not.objectContaining({ description: 'Lorem' })
    ])
  )
});

test('lastId', () => {
  expect(lastId(fetchTodoArrayFromLocalStorage())).toBe(2);
});

//finish here

test('capitalizeFirstLetter', () => {
  expect(capitalizeFirstLetter('hello')).toBe('Hello');
});

