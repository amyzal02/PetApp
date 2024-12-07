import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const LostPets = ({ pets }) => {
  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Image source={require('../assets/PetImages/cat.jpg')} style={styles.petImage} />
      <Text style={styles.petName}>{item.petName}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lost Pets</Text>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
