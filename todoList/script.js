 // Select DOM elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksList = document.getElementById('tasks-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to render the tasks on the screen
const renderTasks = () => {
    tasksList.innerHTML = '';  // Clear the list before re-rendering

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.completed) taskDiv.classList.add('completed');

        taskDiv.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="mark-complete">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete">Delete</button>
            </div>
        `;

        // Mark task as completed
        taskDiv.querySelector('.mark-complete').addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();  // Re-render the tasks after marking as complete/undo
        });

        // Delete task
        taskDiv.querySelector('.delete').addEventListener('click', () => {
            tasks.splice(index, 1);  // Remove the task from the array
            saveTasks();
            renderTasks();  // Re-render the tasks after deletion
        });

        tasksList.appendChild(taskDiv);
    });
};

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        taskInput.value = '';  // Clear the input field
        renderTasks();  // Re-render the tasks after adding new task
    }
});

// Initialize by rendering tasks
renderTasks();
