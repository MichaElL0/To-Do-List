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

export function findProjectByName(name) {
    return projects.find(p => p.name === name);
}

export function getAllProjects() {
    return projects;
}

createProject("Project 33");