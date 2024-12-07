// src/found-pets.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Import the local images
const foundPetsData = [
  { id: '1', name: 'Charlie', description: 'Found near the grocery store', image: require('../assets/PetImages/dog2.jpg') },
  { id: '2', name: 'Luna', description: 'Found running in the neighborhood', image: require('../assets/PetImages/dog3.jpg') },
  { id: '3', name: 'Bella', description: 'Found near the park', image: require('../assets/PetImages/cat3.jpg') },
  // Add more posts here as needed
];

const FoundPets = () => {
  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Image source={item.image} style={styles.petImage} />
      <Text style={styles.petName}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Found Pets</Text>
      <FlatList
        data={foundPetsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  post: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  petImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoundPets;
