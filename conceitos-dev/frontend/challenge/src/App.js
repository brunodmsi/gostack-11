import React, { useState, useEffect } from 'react';
import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const object = {
      title,
      url,
      techs: ['Node.js', 'React']
    }

    try {
      const { data: response } = await api.post('/repositories', object);

      setRepositories([response, ...repositories]);
    } catch(err) {
      alert(JSON.stringify(err));
    }
  }
  
  async function handleRepositoryDelete(id) {
    try {
      await api.delete(`/repositories/${id}`);
      
      const repositoryIndex = repositories.findIndex(repo => repo.id === id);

      const arr = [...repositories];
      arr.splice(repositoryIndex, 1);

      setRepositories(arr);
    } catch(err) {
      alert(JSON.stringify(err));
    }
  }

  useEffect(() => {
    async function loadRepositories() {
      const { data: response } = await api.get('/repositories')

      setRepositories(response.reverse());
    }

    loadRepositories();
  }, [])

  return (
    <div>  
      <br/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Titulo" onChange={(e) => setTitle(e.target.value)}/> <br/>
        <input type="text" name="url" placeholder="URL do Github" onChange={(e) => setUrl(e.target.value)}/><br/>
        <input type="text" name="techs" placeholder="Tecnologias (divida por espacos)" onChange={(e) => setTechs(e.target.value)}/><br/>
        
        <button type="submit">Adicionar</button> <br/> <br/>
      </form>

      <br/>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            Titulo: {repository.title} <br/>
            Tecnologias: {repository.techs.map(tech => `${tech}, `)} <br/>
            Link do Github: {repository.url} <br/>
            <button onClick={() => handleRepositoryDelete(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
