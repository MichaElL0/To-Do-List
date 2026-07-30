export function syncProjectTooltips() {
    document.querySelectorAll(".project-p").forEach(p => {
        p.title = p.textContent;
    });
}

const addTaskDialog = document.querySelector(".add-task-box");
const addProjectDialog = document.querySelector(".add-project-box");

export function openAddTaskModal() {
    addTaskDialog.showModal();
}

export function openAddProjectModal() {
    addProjectDialog.showModal();
}