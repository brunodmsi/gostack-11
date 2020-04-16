"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProjectService_1 = require("./services/ProjectService");
var routes = express_1.Router();
var projects = [];
routes.get('/projects', function (request, response) {
    var title = request.query.title;
    var results = ProjectService_1.getProjects({ title: title, projects: projects });
    return response.json(results);
});
routes.post('/projects', function (request, response) {
    var _a = request.body, title = _a.title, owner = _a.owner;
    var project = ProjectService_1.createProject({ title: title, owner: owner });
    projects.push(project);
    return response.json(project);
});
routes.put('/projects/:id', function (request, response) {
    var id = request.params.id;
    var _a = request.body, title = _a.title, owner = _a.owner;
    var projectIndex = projects.findIndex(function (project) { return project.id === id; });
    if (projectIndex === -1) {
        return response.status(400).json({
            error: 'Project not found'
        });
    }
    var project = {
        id: id,
        title: title,
        owner: owner
    };
    projects[projectIndex] = project;
    return response.json(project);
});
routes.delete('/projects/:id', function (request, response) {
    var id = request.params.id;
    var projectIndex = projects.findIndex(function (project) { return project.id === id; });
    if (projectIndex === -1) {
        return response.status(400).json({
            error: 'Project not found'
        });
    }
    projects.splice(projectIndex, 1);
    return response.status(204).send();
});
exports.default = routes;
