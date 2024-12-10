import React, { useState, useEffect, useRef } from 'react'; 
import { View, TextInput, Button, StyleSheet, Text, Alert, Image, ScrollView, TouchableOpacity, Platform, Linking } from 'react-native';
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
  const locationWatcherRef = useRef(null);

  useEffect(() => {
	const getLocation = async () => {
	  const { status } = await Location.requestForegroundPermissionsAsync();
	  if (status !== 'granted') {
		Alert.alert('Permission Denied', 'Location permission is required to get your location.');
		return;
	  }
  
	  // Remove any existing location watcher
	  if (locationWatcherRef.current) {
		locationWatcherRef.current.remove();
	  }
  
	  // Start a new location watcher
	  locationWatcherRef.current = await Location.watchPositionAsync(
		{ accuracy: Location.Accuracy.BestForNavigation, timeInterval: 10000, distanceInterval: 10 },
		(newLocation) => {
		  setLocation(newLocation.coords);
		}
	  );
  
	  return () => {
		if (locationWatcherRef.current) {
		  locationWatcherRef.current.remove();
		}
	  };
	};
  
	getLocation();
  
	// Cleanup function to remove location watcher when component unmounts
	return () => {
	  if (locationWatcherRef.current) {
		locationWatcherRef.current.remove();
	  }
	};
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

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied', 
        'Camera access is required to take a photo.',
        [
          { text: 'Cancel' },
          {
            text: 'Open Settings',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        ]
      )
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPetPhoto({ uri: result.assets.at(0).uri });
      setSelectedImage(result.assets.at(0).uri);
    }
  };

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
      setPetName('');
      setDescription('');
      setPetType('lost');
      setSelectedImage(null);
	  setLocation(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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
          <View style={styles.photoButtons}>
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
              <Text style={styles.imagePickerButtonText}>
                {selectedImage ? 'Change Image' : 'Select Image'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imagePickerButton} onPress={takePhoto}>
              <Text style={styles.imagePickerButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}
        </View>

        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationText}>
              Latitude: {location.latitude.toFixed(4)} Longitude: {location.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post Pet Alert</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E8EAEF',
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
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#C2D5B9',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
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
    backgroundColor: '#C2D5B9',
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
