# Kanban Board

A simple drag-and-drop task management board inspired by Trello. This project allows users to create tasks, organize them across different stages, and persist data using localStorage.

---

## Features

* Create tasks with title, description, and priority
* Drag and drop tasks between:

  * To Do
  * In Progress
  * Done
* Edit existing tasks
* Delete tasks
* Priority-based color coding (Low, Medium, High)
* Data persistence using browser localStorage
* Clean and responsive UI

---

## Tech Stack

* HTML
* CSS
* JavaScript (Vanilla JS)

---

## Project Structure

```
index.html
style.css
script.js
```

---

## How It Works

* Tasks are stored as objects in an array
* Each task contains:

  * id
  * title
  * description
  * priority
  * column (status)
* Data is saved in localStorage to maintain state after refresh
* Drag-and-drop updates the task’s column dynamically

---

## Getting Started

1. Clone the repository or download the files
2. Open `index.html` in your browser

No installation or dependencies required

---

## Usage

* Add a task using the input form
* Drag tasks between columns to update status
* Click **Edit** to modify a task
* Click **Delete** to remove a task
