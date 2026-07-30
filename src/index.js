import "./style.css";
import { syncProjectTooltips, openAddProjectModal, openAddTaskModal } from "./DOM.js";

syncProjectTooltips();

const addTaskButton = document.querySelector("#task-btn");
const addProjectButton = document.querySelector("#new-project-btn");

addTaskButton.addEventListener("click", openAddTaskModal);
addProjectButton.addEventListener("click", openAddProjectModal);