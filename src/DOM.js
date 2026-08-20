import editIcon from "./images/file-document-edit-outline.svg";
import trashIcon from "./images/trash-can-outline.svg";

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

const addProjectForm = document.querySelector(".add-project-box form");
export function readProject() {
    const formData = new FormData(addProjectForm);
    return { name: formData.get("project-title") };
}

const addTaskForm = document.querySelector(".add-task-box form");

export function readForm() {
    const formData = new FormData(addTaskForm);
    let title = formData.get("title");
    let description = formData.get("description");
    let date = formData.get("date");
    let priority = formData.get("priority");
    let projectId = formData.get("projectName");

    return {
        title: title,
        description: description,
        date: date,
        priority: priority,
        projectId: projectId
    };
}

export function initAddTaskDialog(onAdd) {
    addTaskDialog.addEventListener("close", () => {
        if(addTaskDialog.returnValue === "add") {
            onAdd();
            addTaskForm.reset();
        }
    });
}

export function initAddProjectDialog(onAdd) {
    addProjectDialog.addEventListener("close", () => {
        if(addProjectDialog.returnValue === "add") {
            onAdd();
            addProjectForm.reset();
        }
    });
}

const taskList = document.querySelector("#task-list");

export function renderTasks(tasks) {
    taskList.textContent = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item priority-${task.priority}`;
        li.dataset.taskId = task.id;
        if( task.completed) {
            li.classList.add("completed");
        }

        const label = document.createElement("label");
        label.className = "task-checkbox";
        li.appendChild(label)
        const inputCheck = document.createElement("input");
        inputCheck.type = "checkbox"
        inputCheck.name = "task-done"
        inputCheck.checked = task.completed;
        const checkMarkSpan = document.createElement("span");
        checkMarkSpan.className = "checkmark";
        label.append(inputCheck, checkMarkSpan);

        const taskContent = document.createElement("div");
        taskContent.className = "task-content";
        li.appendChild(taskContent);
        const taskTitle = document.createElement("p");
        taskTitle.textContent = task.title;
        taskTitle.className = "task-title";
        const taskDesc = document.createElement("p");
        taskDesc.textContent = task.description;
        taskDesc.className = "task-description";
        const taskDate = document.createElement("span");
        taskDate.textContent = task.date;
        taskDate.className = "task-due";
        taskContent.append(taskTitle, taskDesc, taskDate);

        const taskBtns = document.createElement("div");
        taskBtns.className = "task-buttons";
        li.appendChild(taskBtns);
        const modifyBtn = document.createElement("button");
        modifyBtn.type = "button";
        modifyBtn.className = "modify-btn";
        taskBtns.appendChild(modifyBtn);
        const modifyImg = document.createElement("img");
        modifyImg.src = editIcon;
        modifyImg.alt = "Task edit";
        modifyBtn.appendChild(modifyImg);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        taskBtns.appendChild(deleteBtn);
        const deleteImg = document.createElement("img");
        deleteImg.src = trashIcon;
        deleteImg.alt = "Trash can";
        deleteBtn.appendChild(deleteImg);

        taskList.appendChild(li);
    });
}

export function initTaskListDelegation(onDelete) {
    taskList.addEventListener("click", e => {
        const deleteBtn = e.target.closest(".delete-btn");
        if(!deleteBtn) return;

        const li = deleteBtn.closest("li");
        const taskId = li.dataset.taskId;
        onDelete(taskId);
    });
}



const projectContainer = document.querySelector(".projects-container");

export function initProjectListDelegation(onDelete) {
    projectContainer.addEventListener("click", e => {
        const deleteBtn = e.target.closest(".delete-btn");
        if(!deleteBtn) return;

        const div = deleteBtn.closest(".project-card");
        const projectId = div.dataset.projectId;
        onDelete(projectId);
    });
}

export function renderProjects(projects) {
    projectContainer.textContent = "";

    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.dataset.projectId = project.id;
        projectContainer.appendChild(projectCard);
        
        const projectSelectBtn = document.createElement("button");
        projectSelectBtn.type = "button";
        projectSelectBtn.className = "project-select"
        projectCard.appendChild(projectSelectBtn);
        
        const projectName = document.createElement("p");
        projectName.title = "";
        projectName.className = "project-p";
        projectName.textContent = project.name;
        projectSelectBtn.appendChild(projectName);

        const projectBtnsContainer = document.createElement("div");
        projectBtnsContainer.className = "project-buttons";
        projectCard.appendChild(projectBtnsContainer);

        const modifyButton = document.createElement("button");
        modifyButton.type = "button";
        modifyButton.className = "modify-btn";
        projectBtnsContainer.appendChild(modifyButton);

        const modifyImg = document.createElement("img");
        modifyImg.src = editIcon;
        modifyImg.alt = "Project edit icon";
        modifyButton.appendChild(modifyImg);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        projectBtnsContainer.appendChild(deleteButton);

        const deleteImg = document.createElement("img");
        deleteImg.src = trashIcon;
        deleteImg.alt = "Trash can icon";
        deleteButton.appendChild(deleteImg);
    });
}

const projectsSelect = document.querySelector("#project-select");

export function renderProjectOptions(projects) {
    projectsSelect.textContent = "";

    const placeholderProject = document.createElement("option");
    placeholderProject.value = "";
    placeholderProject.textContent = "--Please choose a project";
    projectsSelect.appendChild(placeholderProject);

    projects.forEach(project => {
        const projectOption = document.createElement("option");
        projectOption.value = project.id;
        projectOption.textContent = `${project.name}`;
        projectsSelect.appendChild(projectOption);
    });
}

export function initTaskCompleteDelegation(onToggle) {
    taskList.addEventListener("change", e => {
        if(e.target.type !== "checkbox") return;

        const li = e.target.closest("li");
        const taskId = li.dataset.taskId;
        onToggle(taskId);
    });
}