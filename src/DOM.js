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

const addTaskForm = document.querySelector(".add-task-box form");
export function readForm() {
    const formData = new FormData(addTaskForm);
    let title = formData.get("title");
    let description = formData.get("description");
    let date = formData.get("date");
    let priority = formData.get("priority");
    let projectName = formData.get("projectName");

    return {
        title: title,
        description: description,
        date: date,
        priority: priority,
        projectName: projectName
    };
}

export function initAddTaskDialog(onAdd) {
    addTaskDialog.addEventListener("close", () => {
        if(addTaskDialog.returnValue === "add") {
            onAdd();
        }
    });
}