import { uuid } from 'uuidv4';

import { IProject } from '../@types/Project';

interface ProjectFilter {
  title?: string
  projects: Array<IProject>;
}

export function getProjects({ title, projects }: ProjectFilter) {
  if (!title) return projects; 
  
  const project = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return project;
}

export function createProject({ title, owner }: IProject) {
  const project = {
    id: uuid(),
    title,
    owner
  }

  return project;
}
