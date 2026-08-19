import "./style.css";
import { syncProjectTooltips, openAddProjectModal, openAddTaskModal, readForm, initAddTaskDialog, renderTasks, initAddProjectDialog, readProject, renderProjects, renderProjectOptions, initTaskListDelegation, initProjectListDelegation } from "./DOM.js";
import { createTask, getAllTasks, deleteTask } from "./taskManager.js";
import { createProject, getAllProjects, deleteProject } from "./projectManager.js";

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

initTaskListDelegation((taskId) => {
    deleteTask(taskId);
    renderTasks(getAllTasks());
});

initProjectListDelegation((projectId) => {
    deleteProject(projectId);
    renderProjects(getAllProjects());
    console.log(getAllProjects());
});