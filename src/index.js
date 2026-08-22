import "./style.css";
import { syncProjectTooltips, openAddProjectModal, openAddTaskModal, readForm, initAddTaskDialog, renderTasks, initAddProjectDialog, readProject, renderProjects, renderProjectOptions, initTaskListDelegation, initProjectListDelegation, initTaskCompleteDelegation, initFilterTasks } from "./DOM.js";
import { createTask, getAllTasks, deleteTask, toggleTaskComplete, getFilteredTasks } from "./taskManager.js";
import { createProject, getAllProjects, deleteProject } from "./projectManager.js";

syncProjectTooltips();

createTask({
    title: "First task",
    description: "Some description",
    date: "2026-12-24",
    priority: "low",
    projectId: crypto.randomUUID()
});

createTask({
    title: "Second more important task",
    description: "Some description",
    date: "2026-10-24",
    priority: "medium",
    projectId: crypto.randomUUID()
});

createTask({
    title: "Last very important task",
    description: "Some description",
    date: "2026-09-11",
    priority: "high",
    projectId: crypto.randomUUID()
});

createProject("Sample task");
renderProjects(getAllProjects());

renderTasks(getAllTasks());
renderProjectOptions(getAllProjects());

const addTaskButton = document.querySelector("#task-btn");
const addProjectButton = document.querySelector("#new-project-btn");

addTaskButton.addEventListener("click", openAddTaskModal);
addProjectButton.addEventListener("click", openAddProjectModal);

initAddTaskDialog(() => {
    const taskData = readForm();
    createTask(taskData);
    renderTasks(getAllTasks());
    console.log(getAllTasks());
});

initAddProjectDialog(() => {
    const projectData = readProject();
    createProject(projectData.name);
    renderProjectOptions(getAllProjects());
    renderProjects(getAllProjects());
    console.log(getAllProjects());
});

initTaskListDelegation((taskId) => {
    deleteTask(taskId);
    renderTasks(getAllTasks());
});

initProjectListDelegation((projectId) => {
    deleteProject(projectId);
    renderProjects(getAllProjects());
    console.log(getAllProjects());
});

initTaskCompleteDelegation((taskId) => {
    toggleTaskComplete(taskId);
    renderTasks(getAllTasks());
    console.log(getAllTasks())
});

initFilterTasks((filterType) => {
    renderTasks(getFilteredTasks(filterType));
});