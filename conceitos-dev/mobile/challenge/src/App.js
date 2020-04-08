import React, { useState, useEffect, useMemo } from 'react';
import { 
  SafeAreaView, 
  View, 
  StatusBar, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function loadRepositories() {
      const { data: response } = await api.get('/repositories');

      setRepositories(response);
    }
    
    loadRepositories()
  }, []);

  async function handleLikeRepository(id) {
    setRefresh(true);

    const { data: response } = await api.post(`/repositories/${id}/like`);

    const repositoryIndex = repositories.findIndex(repo => repo.id === response.id);
    repositories[repositoryIndex] = response;

    setRepositories(repositories);

    setRefresh(false);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          extraData={refresh}
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map(tech => <Text style={styles.tech} key={tech}>{tech}</Text>)}
              </View>

              <View style={styles.likesContainer}>
                <Text 
                  style={styles.likeText} 
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtida{repository.likes !== 1 ? 's' : ''}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
          
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },

  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 20
  },

  repository: {
    fontSize: 32,
    fontWeight: 'bold'
  },

  techsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: '#04d361',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff'
  },

  likesContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  likeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10
  },

  button: {
    marginTop: 10,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
    backgroundColor: '#7159c1',
    padding: 15,
  }
})
