import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'; // Correct import

const PostPet = ({ onPost }) => {
  const [petName, setPetName] = useState('');
  const [petPhoto, setPetPhoto] = useState(require('../assets/PetImages/noimagefound.jpg')); // Default to dog1.jpg
  const [description, setDescription] = useState('');
  const [petType, setPetType] = useState('lost'); // 'lost' or 'found'
  const [selectedImage, setSelectedImage] = useState(null); // to store the selected image

  // Function to handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("image selected:", result.assets.at(0).uri);
      //setPetPhoto(require('../assets/PetImages/dog1.jpg'));
      setPetPhoto(result.assets.at(0).uri); 
      setSelectedImage(result.assets.at(0).uri); // Save the URI of the selected image
    }
  };

  const handlePost = () => {
    if (!petName || !description) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      console.log("selectedImage: ", selectedImage);
      console.log("petPhoto: ", petPhoto);
      onPost({ petName, petPhoto, description, petType, image: selectedImage });
      setPetName('');
      setDescription('');
      setPetType('lost');
      setSelectedImage(null); // Reset image after posting
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Pet</Text>
      
      {/* Pet Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petName}
        onChangeText={setPetName}
      />
      
      {/* Pet Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Optional Image Picker */}
      <View style={styles.imagePickerContainer}>
        <Button title="Pick a Pet Picture (Optional)" onPress={pickImage} />
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        )}
      </View>

      {/* Pet Type Selector */}
      <Text style={styles.selectText}>Select Pet Type:</Text>
      <Picker
        selectedValue={petType}
        style={styles.picker}
        onValueChange={(itemValue) => setPetType(itemValue)}>
        <Picker.Item label="Lost" value="lost" />
        <Picker.Item label="Found" value="found" />
      </Picker>

      
      {/* Post Pet Button */}
      <View style={styles.buttonContainer}>
        <Button title="Post Pet" onPress={handlePost} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  selectText: {
    //marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 150,  // Adds space between Picker and Button
  },
  imagePickerContainer: {
    marginBottom: 20,  // Space between Image Picker and Post Button
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default PostPet;
