import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { Plus } from 'lucide-react-native';

export default function AddTask() {
  const { colors, typography } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const addTask = useTaskStore((state) => state.addTask);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async () => {
    try {
      console.log('Attempting to add task with data:', {
        title,
        description,
        startTime,
        endTime
      });

      // Validate input
      if (!title.trim()) {
        Alert.alert('Error', 'Please enter a task title');
        return;
      }

      if (!startTime.trim() || !endTime.trim()) {
        Alert.alert('Error', 'Please enter both start and end times');
        return;
      }

      setIsLoading(true);

      // Create task object
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        team: [],
        progress: 0,
        color: '#f8e9f0',
        daysRemaining: 7,
        categoryId: 'default'
      };

      console.log('Creating task with data:', newTask);

      // Add task to store
      await addTask(newTask);
      
      console.log('Task added successfully');

      // Reset form
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');

      // Show success message
      Alert.alert('Success', 'Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'Failed to add task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.sectionTitle, { color: colors.textPrimary }]}>
        Add New Task
      </Text>
      
      <View style={styles.form}>
        <TextInput
          style={[styles.input, { color: colors.textPrimary, borderColor: colors.border }]}
          placeholder="Task Title"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />
        
        <TextInput
          style={[styles.input, { color: colors.textPrimary, borderColor: colors.border }]}
          placeholder="Description (optional)"
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        
        <View style={styles.timeInputs}>
          <TextInput
            style={[styles.timeInput, { color: colors.textPrimary, borderColor: colors.border }]}
            placeholder="Start Time (e.g., 9:00 AM)"
            placeholderTextColor={colors.textSecondary}
            value={startTime}
            onChangeText={setStartTime}
          />
          
          <TextInput
            style={[styles.timeInput, { color: colors.textPrimary, borderColor: colors.border }]}
            placeholder="End Time (e.g., 5:00 PM)"
            placeholderTextColor={colors.textSecondary}
            value={endTime}
            onChangeText={setEndTime}
          />
        </View>
        
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleAddTask}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={[typography.buttonText, { color: colors.textPrimary }]}>
              Adding...
            </Text>
          ) : (
            <>
              <Plus size={16} color={colors.textPrimary} />
              <Text style={[typography.buttonText, { color: colors.textPrimary, marginLeft: 8 }]}>
                Add Task
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  form: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  timeInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
}); 