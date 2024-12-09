import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image as RNImage } from 'react-native';

// Helper function to handle image URIs
const getImageUri = (image) => {
  if (typeof image === 'number') {
    return RNImage.resolveAssetSource(image).uri;
  }
  return image;
};

const FoundPets = ({ pets }) => {
  const renderItem = ({ item }) => (
    <View style={styles.petCard}>
		 <Text style={styles.petName}>{item.petName}</Text>
      <Text style={styles.petDescription}>{item.description}</Text>
      <Image
        source={{ uri: getImageUri(item.image) }} // Handle both local and remote images
        style={styles.petImage}
      />
      {/* MapView to display the pet's location */}
      {item.location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: item.location.latitude,
            longitude: item.location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
            title={item.petName}
            description="Last seen here"
          />
        </MapView>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Found Pets</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  petCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#333',
    marginBottom: 5,
  },
  petDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
	marginBottom: 20,
  },
  map: {
    width: '100%', // Adjust map width to fit card
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default FoundPets;
