// task.ts
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
        this.nextTaskId = 1;
        this.loadTasksFromSessionStorage(); // Load tasks from session storage
        this.setupForm();
        this.updateTaskId();
        this.taskListElement = document.getElementById('taskList');
        this.listAllTasks(); // Required: listAllTasks() - Lists all tasks.
    }
    TaskManager.prototype.loadTasksFromSessionStorage = function () {
        var storedTasks = sessionStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
            if (this.tasks.length > 0) {
                this.nextTaskId = Math.max.apply(Math, this.tasks.map(function (task) { return task.id; })) + 1;
            }
        }
    };
    TaskManager.prototype.saveTasksToSessionStorage = function () {
        sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
    };
    TaskManager.prototype.setupForm = function () {
        var _this = this;
        var addButton = document.getElementById('addTaskButton');
        if (addButton) {
            addButton.addEventListener('click', function (event) { return _this.handleAddTask(event); });
        }
    };
    TaskManager.prototype.updateTaskId = function () {
        var taskIdInput = document.getElementById('taskId');
        if (taskIdInput) {
            taskIdInput.value = this.nextTaskId.toString();
        }
    };
    TaskManager.prototype.handleAddTask = function (event) {
        event.preventDefault();
        var titleInput = document.getElementById('taskName');
        var descriptionInput = document.getElementById('taskDescription');
        var statusSelect = document.getElementById('taskStatus');
        if (titleInput && descriptionInput && statusSelect) {
            var newTask = {
                id: this.nextTaskId,
                title: titleInput.value,
                description: descriptionInput.value,
                status: statusSelect.value,
            };
            this.addTask(newTask); // Required: addTask(task: Task): void - Adds a task to the task list.
            titleInput.value = '';
            descriptionInput.value = '';
            statusSelect.value = 'In Progress';
            this.updateTaskId();
            this.listAllTasks(); // Required: listAllTasks() - Lists all tasks.
            console.log('Task added:', newTask);
            console.log('All tasks:', this.tasks);
        }
    };
    TaskManager.prototype.addTask = function (task) {
        this.tasks.push(task);
        this.nextTaskId++;
        this.saveTasksToSessionStorage(); // Save tasks after adding
    };
    TaskManager.prototype.getTaskById = function (id) {
        for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
            var task = _a[_i];
            if (task.id === id) {
                return task;
            }
        }
        return undefined;
    };
    TaskManager.prototype.markTaskComplete = function (id) {
        var task = this.getTaskById(id);
        if (task) {
            task.status = 'Completed';
            this.listAllTasks(); // Required: listAllTasks() - Lists all tasks.
            this.saveTasksToSessionStorage(); // Save tasks after marking complete
        }
    };
    TaskManager.prototype.listAllTasks = function () {
        var _this = this;
        if (!this.taskListElement)
            return;
        this.taskListElement.innerHTML = "\n        <thead>\n          <tr>\n            <th>ID</th>\n            <th>Title</th>\n            <th>Description</th>\n            <th>Status</th>\n            <th>Actions</th>\n          </tr>\n        </thead>\n        <tbody></tbody>\n      ";
        var tbody = this.taskListElement.querySelector('tbody');
        this.tasks.forEach(function (task, index) {
            var row = tbody.insertRow();
            if (index % 2 === 0) {
                row.classList.add('table-light');
            }
            else {
                row.classList.add('table-secondary');
            }
            row.insertCell().textContent = task.id.toString();
            row.insertCell().textContent = task.title;
            row.insertCell().textContent = task.description;
            row.insertCell().textContent = task.status;
            var actionsCell = row.insertCell();
            var completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.classList.add('btn', 'btn-success', 'btn-sm');
            completeButton.addEventListener('click', function () { return _this.handleCompleteClick(task.id, completeButton); });
            if (task.status === 'Completed') {
                completeButton.disabled = true;
                completeButton.classList.remove('btn-success');
                completeButton.classList.add('btn-secondary');
                completeButton.textContent = "None";
            }
            actionsCell.appendChild(completeButton);
        });
    };
    TaskManager.prototype.handleCompleteClick = function (taskId, button) {
        this.markTaskComplete(taskId); // Required: markTaskComplete(id: number): void - Marks a task as complete.
        button.disabled = true;
        button.classList.remove('btn-success');
        button.classList.add('btn-secondary');
        button.textContent = "None";
    };
    return TaskManager;
}());
document.addEventListener('DOMContentLoaded', function () {
    // Set default screen size (example: 800x600 pixels)
    if (window.innerWidth === 0 && window.innerHeight === 0) { // check if run in nodejs test environment.
        new TaskManager();
        return;
    }
    window.resizeTo(600, 400); // Set the window size
    new TaskManager();
});
