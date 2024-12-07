// src/_layout.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LostPets from './LostPets';
import FoundPets from './FoundPets';
import Messages from './Message';
import PostPet from './PostPet';
import Profile from './Profile';


const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lost Pets" component={LostPets} />
        <Tab.Screen name="Found Pets" component={FoundPets} />
        <Tab.Screen name="Post Pet" component={PostPet} />
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
