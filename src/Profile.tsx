import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const Profile = () => {
  const [bio, setBio] = useState('This is a sample bio. Add contact info here.');
  const [name, setName] = useState('Linda Smith');  // Editable name
  const [email, setEmail] = useState('crazycatlady@example.com');  // Editable email

  const [profilePicture, setProfilePicture] = useState('https://cdn2.thecatapi.com/images/1p5.jpg');  // Static random cat image

  const handleBioChange = (text) => {
    setBio(text);
  };

  const handleNameChange = (text) => {
    setName(text);  // Update name state
  };

  const handleEmailChange = (text) => {
    setEmail(text);  // Update email state
  };

  const handleSave = () => {
    alert('Profile saved!');
    Keyboard.dismiss();  // Dismiss the keyboard when the save button is pressed
  };


  const handleProfilePicChange = (text) => {
    setProfilePicture(text);  // Update profile picture URL
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
		setProfilePicture(result.assets.at(0).uri);
    }
  };

  return (
	// Dismiss keyboard after typing
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Profile Picture */}
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />

        {/* Button to choose an image */}
        <Button title="Choose Profile Picture" onPress={pickImage} />


        {/* Editable name */}
        <TextInput
          style={styles.inputField}
          value={name}
          onChangeText={handleNameChange}
        />
        
        {/* Editable email */}
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={handleEmailChange}
        />

        <Text style={styles.bioLabel}>Bio:</Text>
        <TextInput
          style={styles.bioInput}
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={handleBioChange}
        />
        <Button title="Save Profile" onPress={handleSave} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  inputField: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  bioLabel: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
  },
  bioInput: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default Profile;
