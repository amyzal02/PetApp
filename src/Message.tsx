// src/messages.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Messages = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      {/* Render a list of messages here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Messages;

