const taskAddForm = document.querySelector('.task-add');
const taskValue = document.querySelector('#task-add-input');
const taskDeadLine = document.querySelector('#task-date-input');
const searchInput = document.querySelector('#search');

const todo = {
  tasks: [],

  draw: (tasksToDraw = todo.tasks, searchTerm = '') => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasksToDraw.forEach(({ task, deadline, editMode }, index) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task');

      let displayTask = task;
      if (searchTerm) {
        const regex = new RegExp(searchTerm, 'gi');
        displayTask = task.replace(regex, (match) => `<mark>${match}</mark>`);
      }

      if (editMode) {
        taskItem.innerHTML = `
          <input type="text" id="edit-task-${index}" value="${task}"/>
          <input type="date" id="edit-deadline-${index}" value="${deadline}"/>
          <button onclick="todo.saveEditedTask(${index})">Zapisz</button>
        `;
      } else {
        taskItem.innerHTML = `
          <input type="checkbox" name="${index}" id="${index}" />
          <label for="${index}" onclick="todo.editTask(${index})">
            <span>${displayTask}</span>
            <span>${deadline}</span>
          </label>
          <img src="static/close_FILL0_wght400_GRAD0_opsz24.svg" alt="delete icon" onclick="todo.removeTask(${index})"/>
        `;
      }

      taskList.appendChild(taskItem);
    });
  },

  addTask: (task, deadline) => {
    if (task.length >= 3 && task.length <= 255) {
      todo.tasks.push({ task, deadline });
      todo.saveTaskToLocalStorage();
      todo.draw();
      taskValue.value = '';
      taskDeadLine.value = '';
    } else {
      alert('Nieprawidłowe dane!');
    }
  },

  removeTask: (index) => {
    todo.tasks.splice(index, 1);
    todo.saveTaskToLocalStorage();
    todo.draw();
  },

  editTask: (index) => {
    todo.tasks[index].editMode = true;
    todo.draw();
  },

  saveEditedTask: (index) => {
    const editedTaskInput = document.querySelector(`#edit-task-${index}`);
    const editedDeadlineInput = document.querySelector(`#edit-deadline-${index}`);

    const newTask = editedTaskInput.value;
    const newDeadline = editedDeadlineInput.value;

    if (newTask.length >= 3 && newTask.length <= 255) {
      todo.tasks[index] = { task: newTask, deadline: newDeadline, editMode: false };
      todo.saveTaskToLocalStorage();
      todo.draw();
    } else {
      alert('Nieprawidłowe dane!');
    }
  },

  saveTaskToLocalStorage: () => {
    localStorage.setItem('tasks', JSON.stringify(todo.tasks));
  },

  loadTasksFromLocalStorage: () => {
    const tasksFromLocalStorage = localStorage.getItem('tasks');
    if (tasksFromLocalStorage) {
      todo.tasks = JSON.parse(tasksFromLocalStorage);
      todo.draw();
    }
  },

  filterTasks: (searchTerm) => {
    const filteredTasks = todo.tasks.filter((task) => task.task.toLowerCase().includes(searchTerm.toLowerCase()));
    todo.draw(filteredTasks, searchTerm);
  },
};

taskAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
  todo.addTask(taskValue.value, taskDeadLine.value);
});

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  if (searchTerm.length >= 2) {
    todo.filterTasks(searchTerm);
  } else {
    todo.draw();
  }
});

window.onload = () => {
  todo.loadTasksFromLocalStorage();
};
