import React, { useState, useEffect } from 'react';

import './App.css';

import Header from './components/Header';
// import { Container } from './styles';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`])

    const project = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Bruno De Masi'
    });

    setProjects([...projects, project.data]);
  }

  return (
    <>
      <Header title="Projects" />
      
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      
      <button type="button" onClick={() => handleAddProject()}>Adicionar projeto</button>
    </>
  );
}
