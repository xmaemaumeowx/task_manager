// task.ts

interface Task {
  id: number; // Required: id (number)
  title: string; // Required: title (string)
  description: string; // Required: description (string)
  status: string; // Modified: changed completed(boolean) to status(string) to match the code.
}

class TaskManager {
  private tasks: Task[] = [];
  private nextTaskId: number = 1;
  private taskListElement: HTMLTableElement;

  constructor() {
    this.loadTasksFromSessionStorage(); // Load tasks from session storage
    this.setupForm();
    this.updateTaskId();
    this.taskListElement = document.getElementById('taskList') as HTMLTableElement;
    this.listAllTasks(); // Required: listAllTasks() - Lists all tasks.
  }

  private loadTasksFromSessionStorage(): void {
    const storedTasks = sessionStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      if (this.tasks.length > 0) {
        this.nextTaskId = Math.max(...this.tasks.map(task => task.id)) + 1;
      }
    }
  }

  private saveTasksToSessionStorage(): void {
    sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private setupForm(): void {
    const addButton = document.getElementById('addTaskButton');
    if (addButton) {
      addButton.addEventListener('click', (event) => this.handleAddTask(event));
    }
  }

  private updateTaskId(): void {
    const taskIdInput = document.getElementById('taskId') as HTMLInputElement;
    if (taskIdInput) {
      taskIdInput.value = this.nextTaskId.toString();
    }
  }

  private handleAddTask(event: Event): void {
    event.preventDefault();

    const titleInput = document.getElementById('taskName') as HTMLInputElement;
    const descriptionInput = document.getElementById('taskDescription') as HTMLInputElement;
    const statusSelect = document.getElementById('taskStatus') as HTMLSelectElement;

    if (titleInput && descriptionInput && statusSelect) {
      const newTask: Task = {
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
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.nextTaskId++;
    this.saveTasksToSessionStorage(); // Save tasks after adding
  }

  getTaskById(id: number): Task | undefined { // Required: getTaskById(id: number): Task | undefined - Returns a task by its ID.
    for (const task of this.tasks) {
      if (task.id === id) {
        return task;
      }
    }
    return undefined;
  }

  markTaskComplete(id: number): void { // Required: markTaskComplete(id: number): void - Marks a task as complete.
    const task = this.getTaskById(id);
    if (task) {
      task.status = 'Completed';
      this.listAllTasks(); // Required: listAllTasks() - Lists all tasks.
      this.saveTasksToSessionStorage(); // Save tasks after marking complete
    }
  }

  listAllTasks(): void { // Required: listAllTasks() - Lists all tasks.
    if (!this.taskListElement) return;
    this.taskListElement.innerHTML = `
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

    const tbody = this.taskListElement.querySelector('tbody')!;

    this.tasks.forEach((task, index) => {
      const row = tbody.insertRow();
      if (index % 2 === 0) {
        row.classList.add('table-light');
      } else {
        row.classList.add('table-secondary');
      }
      row.insertCell().textContent = task.id.toString();
      row.insertCell().textContent = task.title;
      row.insertCell().textContent = task.description;
      row.insertCell().textContent = task.status;

      const actionsCell = row.insertCell();
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.classList.add('btn', 'btn-success', 'btn-sm');
      completeButton.addEventListener('click', () => this.handleCompleteClick(task.id, completeButton));

      if (task.status === 'Completed') {
        completeButton.disabled = true;
        completeButton.classList.remove('btn-success');
        completeButton.classList.add('btn-secondary');
        completeButton.textContent = "None";
      }

      actionsCell.appendChild(completeButton);
    });
  }

  private handleCompleteClick(taskId: number, button: HTMLButtonElement): void {
    this.markTaskComplete(taskId); // Required: markTaskComplete(id: number): void - Marks a task as complete.
    button.disabled = true;
    button.classList.remove('btn-success');
    button.classList.add('btn-secondary');
    button.textContent = "None";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Set default screen size (example: 800x600 pixels)
  if (window.innerWidth === 0 && window.innerHeight === 0) { // check if run in nodejs test environment.
    new TaskManager();
    return;
  }

  window.resizeTo(600, 400); // Set the window size

  new TaskManager();
});