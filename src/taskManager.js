import { findProjectByName } from "./projectManager.js";

class Task {
    constructor(title, description, date, priority, projectId) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.projectId = projectId;
        this.completed = false;
    }
}

const tasks = [];

export function createTask({ title, description, date, priority, projectName}) {
    const project = findProjectByName(projectName);
    if(!project) {
        alert("You have to select project to add task to!");
        return null;
    }

    const task = new Task(title, description, date, priority, project.id);
    tasks.push(task);
    return task;
}

export function getAllTasks() {
    return tasks;
}