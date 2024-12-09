import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';

const PostPet = ({ onPost }) => {
  const [petName, setPetName] = useState('');
  const [petPhoto, setPetPhoto] = useState(require('../assets/PetImages/noimagefound.jpg'));
  const [description, setDescription] = useState('');
  const [petType, setPetType] = useState('lost');
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState(null);

  //To keep the location and watch it change if we change locations
  useEffect(() => {
	const getLocation = async () => {
	  const { status } = await Location.requestForegroundPermissionsAsync();
	  if (status !== 'granted') {
		Alert.alert('Permission Denied', 'Location permission is required to get your location.');
		return;
	  }
  
	  // Use watchPositionAsync for continuous location updates
	  const locationWatcher = await Location.watchPositionAsync(
		{ accuracy: Location.Accuracy.BestForNavigation, timeInterval: 10000, distanceInterval: 10 },
		(newLocation) => {
		  setLocation(newLocation.coords);
		}
	  );
  
	  // Cleanup function to stop location tracking when the component is unmounted
	  return () => {
		locationWatcher.remove();
	  };
	};
  
	getLocation();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPetPhoto({ uri: result.assets.at(0).uri });
      setSelectedImage(result.assets.at(0).uri);
    }
  };

  //Ethical to ask for permission
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to get your location.');
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    setLocation(locationData.coords);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handlePost = () => {
    if (!petName || !description) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      onPost({
        petName,
        description,
        petType,
        image: selectedImage || petPhoto,
        location,
      });
      // Reset form
      setPetName('');
      setDescription('');
      setPetType('lost');
      setSelectedImage(null);
      //setLocation(null);
	 
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Post a Lost or Found Pet</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pet Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pet name"
            value={petName}
            onChangeText={setPetName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Describe the pet and circumstances"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pet Type</Text>
          <View style={styles.pickerWrapper}>
            {Platform.OS === 'ios' ? (
              <View style={styles.iosPicker}>
                <Picker
                  selectedValue={petType}
                  onValueChange={(itemValue) => setPetType(itemValue)}
                >
                  <Picker.Item label="Lost Pet" value="lost" />
                  <Picker.Item label="Found Pet" value="found" />
                </Picker>
              </View>
            ) : (
              <View style={styles.androidPickerContainer}>
                <Picker
                  style={styles.androidPicker}
                  selectedValue={petType}
                  onValueChange={(itemValue) => setPetType(itemValue)}
                >
                  <Picker.Item label="Lost Pet" value="lost" />
                  <Picker.Item label="Found Pet" value="found" />
                </Picker>
              </View>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pet Photo (Optional)</Text>
          <TouchableOpacity 
            style={styles.imagePickerButton} 
            onPress={pickImage}
          >
            <Text style={styles.imagePickerButtonText}>
              {selectedImage ? 'Change Image' : 'Select Image'}
            </Text>
          </TouchableOpacity>
          
          {selectedImage && (
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.imagePreview} 
            />
          )}
        </View>

        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationText}>
              Latitude: {location.latitude.toFixed(4)}
              {' '} Longitude: {location.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.postButton} 
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Post Pet Alert</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  iosPicker: {
    height: 200,
  },
  androidPickerContainer: {
    height: 50,
  },
  androidPicker: {
    height: 50,
    width: '100%',
  },
  imagePickerButton: {
    backgroundColor: '#e6e6e6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  locationContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  locationLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  postButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostPet;