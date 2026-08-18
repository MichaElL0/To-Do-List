import "./style.css";
import { syncProjectTooltips, openAddProjectModal, openAddTaskModal, readForm, initAddTaskDialog, renderTasks, initAddProjectDialog, readProject, renderProjects, renderProjectOptions } from "./DOM.js";
import { createTask, getAllTasks } from "./taskManager.js";
import { createProject, getAllProjects } from "./projectManager.js";

syncProjectTooltips();
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