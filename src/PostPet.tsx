import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PostPet = ({ onPost }) => {
  const [petName, setPetName] = useState('');
  const [description, setDescription] = useState('');
  const [petType, setPetType] = useState('lost'); // 'lost' or 'found'

  const handlePost = () => {
    if (!petName || !description) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      onPost({ petName, description, petType });
      setPetName('');
      setDescription('');
      setPetType('lost'); // Reset to lost by default
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Pet</Text>
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

      <Text style={styles.selectText}>Select Pet Type:</Text>
      <Picker
        selectedValue={petType}
        style={styles.picker}
        onValueChange={(itemValue) => setPetType(itemValue)}>
        <Picker.Item label="Lost" value="lost" />
        <Picker.Item label="Found" value="found" />
      </Picker>

      {/* Post Pet Button now below the picker */}
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
    marginBottom: 20, // Ensures space between picker and button
  },
  selectText: {
	marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 150,  // Adds space between the Picker and Button
  },
});

export default PostPet;
