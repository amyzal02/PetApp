import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import FoundPets from './src/FoundPets';
import LostPets from './src/LostPets';
import PostPet from './src/PostPet';
import Messages from './src/Message';
import Profile from './src/Profile';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Tab navigation setup
const Tab = createBottomTabNavigator();

const App = () => {
	// Sample data for Lost and Found Pets
	const [lostPets, setLostPets] = useState([
		{
			petName: 'Buddy',
			description: 'A friendly dog looking for a new home.',
			petType: 'lost',
			image: require('./assets/PetImages/dog1.jpg'),
			location: {
				latitude: 40.7128, 
				longitude: -74.0060, 
			  },


		},
		{
			petName: 'Toby',
			description: 'Ran away on Friday, near the local Walmart',
			petType: 'lost',
			image: require('./assets/PetImages/pup.jpg'),
			location: {
				latitude: 40.9138, 
				longitude: -74.1060,  
			  },


		},
		
		{
			petName: 'Mittens',
			description: 'Missing cat, please help us find her.',
			petType: 'lost',
			image: require('./assets/PetImages/cat.jpg'),
			location: {
				latitude: 34.0522,  // Sample latitude (Los Angeles)
				longitude: -118.2437,  // Sample longitude (Los Angeles)
			  },
		},
		
	]);
	const [foundPets, setFoundPets] = useState([
		{
			petName: 'Glasses Cat',
			description: 'Found this cat. Seems to know a thing or two.',
			petType: 'found',
			image: require('./assets/PetImages/nerdcat.jpg'),
			location: {
				latitude: 38.8898, 
				longitude: -77.0090,  
			  },
		},
		{
			petName: 'Fluffy',
			description: 'Found this dog on the street, very friendly!',
			petType: 'found',
			image: require('./assets/PetImages/cat2.jpg'),
			location: {
				latitude: 51.5074,  // London
				longitude: -0.1278,  // London
			  },
		},
		{
			petName: 'Whiskers',
			description: 'Found this cat near my house, looks lost.',
			petType: 'found',
			image: require('./assets/PetImages/cat3.jpg'),
			location: {
				latitude: 40.7306,  // Chicago
				longitude: -73.9352,  // Chicago
			  },
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
					options={{
						tabBarLabel: 'Post Pet',
						tabBarIcon: () => (
							<MaterialIcons name="post-add" size={24} color="black" />
						),
					}}
				/>

				{/* Lost Pets Feed */}
				<Tab.Screen
					name="LostPets"
					children={() => <LostPets pets={lostPets} />}
					options={{
						 tabBarLabel: 'Lost Pets',
						 tabBarIcon: () => (
							<Ionicons name="paw-outline" size={24} color="black" />
						),
					 }}
				/>

				{/* Found Pets Feed */}
				<Tab.Screen
					name="FoundPets"
					children={() => <FoundPets pets={foundPets} />}
					options={{ 
						tabBarLabel: 'Found Pets',
						tabBarIcon: () => (
							<Ionicons name="paw-outline" size={24} color="black" />
						),
					 }}
				/>

				{/* Profile Page */}
				<Tab.Screen
					name="Profile"
					component={Profile}
					options={{
						 tabBarLabel: 'Profile',
						 tabBarIcon: () => (
						 <AntDesign name="profile" size={24} color="black" />
						 ),

						}}
				/>
					
				{/* Messages Page
				<Tab.Screen
					name="Messages"
					component={Messages}
					options={{ tabBarLabel: 'Messages',
					tabBarIcon:() => (
					<MaterialCommunityIcons name="android-messages" size={24} color="black" /> ),}}
				/> */}

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
