import request from 'supertest';

interface TestProject {
  body: {
    id: string
    title: string
    owner: string
  }
}

import { isUuid } from 'uuidv4';

import app from '../src/app';

describe('Projects', () => {
  it('should have an uuidv4 id', async () => {
    const project: TestProject = await request(app)
      .post('/projects') 
      .send({
        title: 'Backend com Node.js',
        owner: 'Bruno De Masi'
      });

    expect(isUuid(project.body.id)).toBe(true);
  });

  it('should create a new project', async () => {
    const project: TestProject = await request(app)
      .post('/projects') 
      .send({
        title: 'Backend com Node.js',
        owner: 'Bruno De Masi'
      });

    expect(isUuid(project.body.id)).toBe(true);

    expect(project.body).toMatchObject({
      id: project.body.id,
      title: 'Backend com Node.js',
      owner: 'Bruno De Masi'
    });
  });

  it('should return projects list', async () => {
    const project: TestProject = await request(app)
      .post('/projects')
      .send({
        title: 'Backend com Node.js',
        owner: 'Bruno De Masi'
      });

    const response = await request(app)
      .get('/projects')

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: project.body.id,
          title: 'Backend com Node.js',
          owner: 'Bruno De Masi'
        }
      ])
    );
  });

  it('should update a project', async () => {
    const project: TestProject = await request(app)
      .post('/projects')
      .send({
        title: 'Backend com Node.js',
        owner: 'Bruno De Masi'
      });

    const response: TestProject = await request(app)
      .put(`/projects/${project.body.id}`)
      .send({
        title: 'Frontend com ReactJS',
        owner: 'Bruno De Masi'
      });

    expect(isUuid(project.body.id)).toBe(true);
      
    expect(response.body).toMatchObject({
      id: project.body.id,
      title: 'Frontend com ReactJS',
      owner: 'Bruno De Masi'
    });
  });

  it('should delete a project', async () => {
    const response: TestProject = await request(app)
      .post('/projects')
      .send({
        title: 'Backend com Node.js',
        owner: 'Bruno De Masi'
      });

    await request(app).delete(`/projects/${response.body.id}`).expect(204);

    const projects = await request(app)
      .get('/projects')

    const project = projects.body.find((p: { id: string; }) => p.id === response.body.id);

    expect(project).toBe(undefined);
  });

  it('should not be able to update a project that does not exist', async () => {
    await request(app).put('/projects/123').expect(400);
  });

  it('should not be able to delete a project that does not exist', async () => {
    await request(app).delete('/projects/123').expect(400);
  });
})