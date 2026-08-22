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

export function createTask({ title, description, date, priority, projectId}) {
    const task = new Task(title, description, date, priority, projectId);
    tasks.push(task);
    return task;
}

export function getAllTasks() {
    return tasks;
}

export function deleteTask(id) {
    const remaining = tasks.filter(t => t.id !== id);
    tasks.length = 0;
    tasks.push(...remaining);
}

export function toggleTaskComplete(id) {
    const task = tasks.find(t => t.id === id); 
    if(task) task.completed = !task.completed;
}

export function getFilteredTasks(filterType) {
    if (filterType === "all") return tasks;
    if (filterType === "completed") return tasks.filter(t => t.completed);
    if (filterType === "important") return tasks.filter(t => t.priority === "high");
    if (filterType === "today") {
        const todayStr = new Date().toISOString().split("T")[0];
        return tasks.filter(t => t.date === todayStr);
    }
    if (filterType === "week") {
        const day = new Date().getDay();
        const diffToMonday = (day === 0 ? -6 : 1) - day;
        const monday = new Date();
        monday.setDate(monday.getDate() + diffToMonday);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const mondayStr = monday.toISOString().split("T")[0];
        const sundayStr = sunday.toISOString().split("T")[0];
        return tasks.filter(t => t.date >= mondayStr && t.date <= sundayStr);
    }
    return tasks;
}