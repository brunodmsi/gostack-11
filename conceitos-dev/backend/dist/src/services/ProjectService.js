"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
function getProjects(_a) {
    var title = _a.title, projects = _a.projects;
    if (!title)
        return projects;
    var project = title
        ? projects.filter(function (project) { return project.title.includes(title); })
        : projects;
    return project;
}
exports.getProjects = getProjects;
function createProject(_a) {
    var title = _a.title, owner = _a.owner;
    var project = {
        id: uuidv4_1.uuid(),
        title: title,
        owner: owner
    };
    return project;
}
exports.createProject = createProject;
