Markdown

# Simple Task Manager (TypeScript & HTML)

This project is a simple Task Manager web application built using TypeScript and HTML. It allows users to add tasks, mark them as complete, and view a list of all tasks.

**Note:** This implementation deviates from the original requirements regarding the `completed` property. It uses a `status` (string) property instead, as reflected in the provided code.

## Requirements

* Web Browser
* Node.js and npm (Node Package Manager) (Optional, for building TypeScript)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Open `index.html` in your web browser:**

    Simply navigate to the project directory and open the `index.html` file with your preferred web browser.

## Project Structure

task-manager/
├── index.html    # Main HTML file for the application
├── task.ts       # TypeScript code for the Task and TaskManager classes
└── task.js       # Compiled JavaScript file (generated from task.ts)
## Task and TaskManager Classes (TypeScript)

### Task Interface

* **Properties:**
    * `id` (number): Unique identifier for the task.
    * `title` (string): Title of the task.
    * `description` (string): Description of the task.
    * `status` (string): Status of the task (e.g., "In Progress", "Completed"). 

### TaskManager Class

* **Methods:**
    * `addTask(task: Task): void`: Adds a task to the task list.
    * `getTaskById(id: number): Task | undefined`: Returns a task by its ID, or `undefined` if not found.
    * `markTaskComplete(id: number): void`: Marks a task as "Completed" based on its ID.
    * `listAllTasks(): void`: Lists all tasks in an HTML table.

## HTML Structure (index.html)

The `index.html` file provides the user interface for the Task Manager application:

* Includes Bootstrap CSS for styling.
* Contains a form to add new tasks.
* Displays the list of tasks in an HTML table.
* Uses `task.js` to run the task manager.

## TypeScript Compilation (Optional)

If you want to modify the TypeScript code (`task.ts`), you'll need to compile it to JavaScript (`task.js`).

1.  **Install TypeScript:**

    ```bash
    npm install -g typescript
    ```

2.  **Compile the code:**

    ```bash
    tsc task.ts
    ```

    This will generate `task.js` in the same directory.

## Usage

1.  **Adding Tasks:**
    * Enter the task name and description in the input fields.
    * Select the task status from the dropdown.
    * Click the "Add" button.
2.  **Viewing Tasks:**
    * The task list is displayed in the table below the form.
3.  **Marking Tasks Complete:**
    * Click the "Complete" button in the "Actions" column for a task.
4.  **Persistence:**
    * Tasks and task status are saved to session storage. So they will be available until the browser tab is closed.

## Code Explanation

* **`task.ts`:**
    * Defines the `Task` interface and `TaskManager` class.
    * Handles adding, retrieving, and marking tasks as complete.
    * Renders the task list in an HTML table.
    * Uses `sessionStorage` for task persistence.
* **`index.html`:**
    * Provides the HTML structure and styling for the application.
    * Includes the necessary form elements and the task list table.
    * Links to the `task.js` script.

## Note

* This implementation uses `status` (string) instead of `completed` (boolean) as specified in the original requirements. 
* This code uses Bootstrap for styling. Ensure that you have internet access to load the Bootstrap CDN, or download and include bootstrap in the project.
