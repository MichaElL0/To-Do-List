class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
    }
}

const projects = [];

export function createProject(name) {
    const project = new Project(name);
    projects.push(project);
    return project;
}

export function getAllProjects() {
    return projects;
}

export function deleteProject(id) {
    const remaining = projects.filter(p => p.id !== id);
    projects.length = 0;
    projects.push(...remaining);
}

createProject("Project 33");