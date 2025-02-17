import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const UserChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        <Text style={styles.message}>Hi, how's it going?</Text>
        <Text style={styles.message}>Great! How about you?</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
      />
      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  messages: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  sendText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UserChatScreen;