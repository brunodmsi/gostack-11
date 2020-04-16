import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import api from './services/api';

// import { Container } from './styles';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const { data: response } = await api.get('/projects');
      console.log(response);
      setProjects(response);
    }

    loadProjects()
  }, [])

  async function handleAddProject() {
    const { data: project } = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Bruno De Masi' 
    })

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  project: {
    color: '#FFF',
    fontSize: 20,
  },

  button: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  }
})
