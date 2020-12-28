import Task from '../taskmodule';

test('Create new Task with correct information', () => {
  const newTask = new Task('Testing the Task', 'Hey Im a task', '10-29-2024', false, 'Test Project', 2);
  expect(newTask).toBeTruthy();
  expect(newTask).toBeDefined();
  expect(newTask).toEqual({
    title: 'Testing the Task', description: 'Hey Im a task', duedate: '10-29-2024', priority: false, project: 'Test Project', id: 3, isDone: false,
  });
});

test('Wrong task creation without title', () => {
  const newTask = new Task(undefined, 'Hey Im a task', '10-29-2024', false, 'Test Project', 2);

  expect(newTask.title).toBeUndefined();
  expect(newTask).toEqual({
    title: undefined, description: 'Hey Im a task', duedate: '10-29-2024', priority: false, project: 'Test Project', id: 3, isDone: false,
  });
});