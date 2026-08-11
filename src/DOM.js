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
            addTaskForm.reset();
        }
    });
}

const taskList = document.querySelector("#task-list");

export function renderTasks(tasks) {
    taskList.textContent = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item priority-${task.priority}`;
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
        modifyImg.src = "./images/file-document-edit-outline.svg";
        modifyImg.alt = "Task edit";
        modifyBtn.appendChild(modifyImg);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        taskBtns.appendChild(deleteBtn);
        const deleteImg = document.createElement("img");
        deleteImg.src = "./images/trash-can-outline.svg";
        deleteImg.alt = "Trash can";
        deleteBtn.appendChild(deleteImg);

        taskList.appendChild(li);
    });
}