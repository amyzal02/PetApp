import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import FoundPets from './src/FoundPets';
import LostPets from './src/LostPets';
import PostPet from './src/PostPet';
import Messages from './src/Message';
import Profile from './src/Profile';

// Tab navigation setup
const Tab = createBottomTabNavigator();

const App = () => {
  // Sample data for Lost and Found Pets
  const [lostPets, setLostPets] = useState([
    {
      petName: 'Buddy',
      description: 'A friendly dog looking for a new home.',
      petType: 'lost',
      image: require('./assets/PetImages/dog1.jpg')

    },
    {
      petName: 'Mittens',
      description: 'Missing cat, please help us find her.',
      petType: 'lost',
      image: require('./assets/PetImages/cat.jpg')
    },
  ]);
  const [foundPets, setFoundPets] = useState([
    {
      petName: 'Fluffy',
      description: 'Found this dog on the street, very friendly!',
      petType: 'found',
      image: require('./assets/PetImages/cat2.jpg')
    },
    {
      petName: 'Whiskers',
      description: 'Found this cat near my house, looks lost.',
      petType: 'found',
      image: require('./assets/PetImages/cat3.jpg')
    },
  ]);

  // Handle the post submission
  const handlePost = (pet) => {
    if (pet.petType === 'lost') {
      setLostPets((prevState) => [pet, ...prevState]);
    } else {
      setFoundPets((prevState) => [pet, ...prevState]);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Post Pet Page */}
        <Tab.Screen
          name="PostPet"
          children={() => <PostPet onPost={handlePost} />}
          options={{ tabBarLabel: 'Post Pet' }}
        />
        
        {/* Lost Pets Feed */}
        <Tab.Screen
          name="LostPets"
          children={() => <LostPets pets={lostPets} />}
          options={{ tabBarLabel: 'Lost Pets' }}
        />
        
        {/* Found Pets Feed */}
        <Tab.Screen
          name="FoundPets"
          children={() => <FoundPets pets={foundPets} />}
          options={{ tabBarLabel: 'Found Pets' }}
        />

        {/* Profile Page */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ tabBarLabel: 'Profile' }}
        />

        {/* Messages Page */}
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{ tabBarLabel: 'Messages' }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;
