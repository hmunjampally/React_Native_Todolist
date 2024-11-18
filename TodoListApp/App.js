import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, TextInput, View,
  FlatList, TouchableOpacity, Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskID, setEditTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const fadeAnim = new Animated.Value(1);

  // Load tasks from AsyncStorage when the app starts
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
      startFadeAnimation();
    }
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((item) => item.id !== taskId));
    startFadeAnimation();
  };

  // Edit a task
  const editTask = (taskId, currentText) => {
    setEditTaskId(taskId);
    setEditingText(currentText);
  };

  const saveEdit = (taskId) => {
    setTasks(
      tasks.map((item) =>
        item.id === taskId ? { ...item, text: editingText } : item
      )
    );
    setEditTaskId(null);
    setEditingText('');
  };

  // Toggle task completion
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((item) =>
        item.id === taskId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Fade animation for adding and deleting tasks
  const startFadeAnimation = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Animated.View style={[styles.taskContainer, { opacity: fadeAnim }]}>
            {editTaskID === item.id ? (
              <TextInput
                style={styles.editInput}
                value={editingText}
                onChangeText={(text) => setEditingText(text)}
              />
            ) : (
              <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.completedTaskText,
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.buttonContainer}>
              {editTaskID === item.id ? (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => saveEdit(item.id)}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editTask(item.id, item.text)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.deleteButtonContainer}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

// Styling code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#5C5CFF',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonContainer: {
    backgroundColor: '#FF5C5C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: '#FFD700',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
