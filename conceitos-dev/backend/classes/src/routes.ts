import { Request, Response, Router } from 'express';

import { IProject, FilterByTitle } from './@types/Project';

import { createProject, getProjects } from './services/ProjectService';

const routes = Router();

const projects: Array<IProject> = [];

routes.get('/projects', (
  request: Request & FilterByTitle, 
  response: Response
): Response => {
  const { title } = request.query;

  const results = getProjects({ title, projects });

  return response.json(results);
});

routes.post('/projects', (request: Request, response: Response): Response => {
  const { title, owner } = request.body;
  
  const project = createProject({ title, owner });
  projects.push(project);

  return response.json(project);
});

routes.put('/projects/:id', (request: Request, response: Response): Response => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    return response.status(400).json({
      error: 'Project not found'
    })
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project);
});

routes.delete('/projects/:id', (request: Request, response: Response): Response => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    return response.status(400).json({
      error: 'Project not found'
    });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

export default routes;