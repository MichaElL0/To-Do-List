import "./style.css";
import { syncProjectTooltips, openAddProjectModal, openAddTaskModal, readForm, initAddTaskDialog } from "./DOM.js";
import { createTask, getAllTasks } from "./taskManager.js";

syncProjectTooltips();

const addTaskButton = document.querySelector("#task-btn");
const addProjectButton = document.querySelector("#new-project-btn");

addTaskButton.addEventListener("click", openAddTaskModal);
addProjectButton.addEventListener("click", openAddProjectModal);

initAddTaskDialog(() => {
    const taskData = readForm();
    createTask(taskData);
    console.log(getAllTasks());
});