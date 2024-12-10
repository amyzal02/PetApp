import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [bio, setBio] = useState('This is a sample bio. Add contact info here.');
  const [name, setName] = useState('Linda Smith');
  const [email, setEmail] = useState('crazycatlady@example.com');
  const [profilePicture, setProfilePicture] = useState('https://cdn2.thecatapi.com/images/1p5.jpg');

  const handleBioChange = (text) => {
    setBio(text);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSave = () => {
    alert('Profile saved!');
    Keyboard.dismiss();
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <Image 
              source={{ uri: profilePicture }} 
              style={styles.profilePicture} 
            />
          </View>

          {/* Image Pick Button */}
          <TouchableOpacity 
            style={styles.imagePickButton} 
            onPress={pickImage}
          >
            <Text style={styles.imagePickButtonText}>Change Picture</Text>
          </TouchableOpacity>

          {/* Name Input */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={handleNameChange}
            placeholder="Your Name"
          />

          {/* Email Input */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Email Address"
            keyboardType="email-address"
          />

          {/* Bio Section */}
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={handleBioChange}
            placeholder="Tell us about yourself"
          />

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAEF', // Soft, light grey background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 10,
    padding: 20,
    shadowColor: '#B7B8B7', // Soft grey shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#C2D5B9'
  },
  label: {
    fontSize: 14,
    color: '#6D6D6D', // Neutral grey color
    marginBottom: 5,
    marginLeft: 5,
  },
  inputField: {
    width: '100%',
    height: 50,
    backgroundColor: '#F6F7F9', // Very light grey background
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D1D1D1', // Light grey border
    color: '#6D6D6D', // Neutral grey text
  },
  bioInput: {
    width: '100%',
    height: 120,
    backgroundColor: '#F6F7F9', // Very light grey background
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D1D1D1', // Light grey border
    textAlignVertical: 'top',
    color: '#6D6D6D', // Neutral grey text
  },
  imagePickButton: {
    alignSelf: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#C2D5B9',
    borderRadius: 8,
  },
  imagePickButtonText: {
    color: '#FFFFFF', // White text
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#C2D5B9', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
