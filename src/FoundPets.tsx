import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, Alert, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image as RNImage } from 'react-native';

// Helper function to get URI from `require()`
const getImageUri = (image) => {
  if (typeof image === 'number') {
    return RNImage.resolveAssetSource(image).uri;
  }
  return image;
};

const FoundPets = ({ pets }) => {
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [petComments, setPetComments] = useState({}); // Object to hold comments for each pet

  // Handle adding a comment
  const handleAddComment = (petIndex) => {
    if (!newComment.trim() || !commenterName.trim()) {
      Alert.alert('Error', 'Comment and name cannot be empty');
      return;
    }

    const updatedComments = { ...petComments };
    if (!updatedComments[petIndex]) {
      updatedComments[petIndex] = [];
    }

    updatedComments[petIndex].push({ name: commenterName, comment: newComment });
    setPetComments(updatedComments);
    setNewComment(''); // Clear input field after adding comment
    setCommenterName(''); // Clear commenter name input
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.petCard}>
            <Text style={styles.petName}>{item.petName}</Text>
            <Text style={styles.petDescription}>{item.description}</Text>
            <Image
              source={{ uri: getImageUri(item.image) }} // Handle both local and remote images
              style={styles.petImage}
            />

            {/* MapView to display the pet's location */}
            {item.location && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                  }}
                  title={item.petName}
                  description="Last seen here"
                />
              </MapView>
            )}

            {/* Comment Section */}
            <View style={styles.commentSection}>
              <Text style={styles.commentTitle}>Comments</Text>
              {petComments[index] && petComments[index].length > 0 ? (
                petComments[index].map((comment, i) => (
                  <View key={i} style={styles.commentContainer}>
                    <Text style={styles.commenterName}>{comment.name}</Text>
                    <Text style={styles.commentText}>{comment.comment}</Text>
                  </View>
                ))
              ) : (
                <Text>No comments yet. Be the first to comment!</Text>
              )}
            </View>

            {/* Input for Adding Comment */}
            <TextInput
              style={styles.nameInput}
              value={commenterName}
              onChangeText={setCommenterName}
              placeholder="Your name"
            />
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
            />
            <TouchableOpacity
              style={styles.addCommentButton}
              onPress={() => handleAddComment(index)}
            >
              <Text style={styles.addCommentButtonText}>Post Comment</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#E8EAEF',
  },
  petCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  petDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  commentSection: {
    marginTop: 15,
    marginBottom: 10,
    width: '100%',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    width: '100%'
  },
  commentContainer: {
    marginTop: 5,
    width: '100%',
  },
  commenterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'left', // Align name to the left
  },
  commentText: {
    fontSize: 14,
    width: '100%',
    color: '#555',
    textAlign: 'left', // Align comment text to the left
  },
  nameInput: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    marginBottom: 10,
    width: '100%'
  },
  commentInput: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    marginBottom: 10,
    width: '100%'
  },
  addCommentButton: {
    backgroundColor: '#C2D5B9',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addCommentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoundPets;
