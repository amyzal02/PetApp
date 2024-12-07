// src/post-pet.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PostPet = () => {
  const [petName, setPetName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Request media library permission when the component mounts
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getPermission();
  }, []);

  const handlePost = () => {
    if (!petName || !description || !imageUri) {
      Alert.alert('Error', 'Please fill in all fields and upload a photo');
    } else {
      console.log('Pet Posted:', petName, description, imageUri);
      // Handle posting logic here (store data in a database or API)
    }
  };

  const pickImage = async () => {
    // Check if permission is granted
    if (!hasPermission) {
      Alert.alert('Permission Required', 'You need to grant permission to access the photo library.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE], // Specify we only want images
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Lost/Found Pet</Text>
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petName}
        onChangeText={setPetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      
      {imageUri && <Image source={{ uri: imageUri }} style={styles.petImage} />}
      
      <Button title="Pick a Pet Picture" onPress={pickImage} />
      <Button title="Post Pet" onPress={handlePost} />
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
  petImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default PostPet;
