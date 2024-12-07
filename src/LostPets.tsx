// src/lost-pets.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Import the local images
const lostPetsData = [
  { id: '1', name: 'Bella', description: 'Missing since last night near the park', image: require('../assets/PetImages/cat.jpg') },
  { id: '2', name: 'Max', description: 'Lost in the city center', image: require('../assets/PetImages/dog1.jpg') },
  { id: '3', name: 'Luna', description: 'Lost in the neighborhood', image: require('../assets/PetImages/cat2.jpg') },
  // Add more posts here as needed
];

const LostPets = () => {
  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Image source={item.image} style={styles.petImage} />
      <Text style={styles.petName}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lost Pets</Text>
      <FlatList
        data={lostPetsData}
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

export default LostPets;
