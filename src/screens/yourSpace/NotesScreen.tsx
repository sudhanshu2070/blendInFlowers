import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

type Note = {
  id: string;
  title: string;
  content: string;
};

const NotesScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  // Load notes from AsyncStorage on component mount
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };
    loadNotes();
  }, []);

  // Save notes to AsyncStorage whenever notes change
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
      } catch (error) {
        console.error('Failed to save notes:', error);
      }
    };
    saveNotes();
  }, [notes]);

  // Add a new note
  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentNote(newNote);
    setIsModalVisible(true);
  };

  // Open a note for editing
  const openNote = (note: Note) => {
    setCurrentNote(note);
    setIsModalVisible(true);
  };

  // Save changes to a note
  const saveNote = (updatedContent: string) => {
    if (currentNote) {
      const updatedNote = { ...currentNote, content: updatedContent };
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === currentNote.id ? updatedNote : note))
      );
      setCurrentNote(updatedNote);
    }
  };

  // Delete a note
  const deleteNote = () => {
    if (currentNote) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== currentNote.id));
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.titleText, { fontFamily: 'Playwrite' }]}>
          A Beginner's Guide to Destroying the Moon...
        </Text>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteBox}
            onPress={() => openNote(item)}
          >
            <Text style={[styles.noteTitle, { fontFamily: 'ClashGrotesk' }]}>
              {item.title}
            </Text>
            <Text numberOfLines={2} style={[styles.notePreview, { fontFamily: 'Christmas' }]}>
              {item.content || 'Empty note...'}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { fontFamily: 'Rosaline-Regular' }]}>
            No notes yet. Tap "+" to add one!
          </Text>
        }
      />

      {/* Add Note Button */}
      <TouchableOpacity style={styles.addButton} onPress={addNote}>
        <Icon name="add-circle-outline" size={50} color="#FFD700" />
      </TouchableOpacity>

      {/* Fullscreen Note Modal */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={[styles.noteTitleInput, { fontFamily: 'Stardom-Regular' }]}
            value={currentNote?.title || ''}
            onChangeText={(text) => {
              if (currentNote) {
                setCurrentNote({ ...currentNote, title: text });
              }
            }}
            placeholder="Note Title"
          />
          <TextInput
            style={[styles.noteContentInput, { fontFamily: 'Comico-Regular' }]}
            value={currentNote?.content || ''}
            onChangeText={(text) => saveNote(text)}
            placeholder="Write your note here..."
            multiline
          />
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteNote}>
              <Text style={[styles.deleteButtonText, { fontFamily: 'Comico-Regular' }]}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={[styles.saveButtonText, { fontFamily: 'Comico-Regular' }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
  },
  notesList: {
    padding: 10,
  },
  noteBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  notePreview: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999999',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  noteTitleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  noteContentInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default NotesScreen;