import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStudents } from '../src/store/students';

export default function AddStudent() {
  const router = useRouter();
  const { addStudent } = useStudents();
  const [name, setName] = useState('');

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    addStudent(trimmed);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Student name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g. Juana"
        style={styles.input}
        autoFocus
      />
      <Pressable style={styles.btn} onPress={submit}>
        <Text style={styles.btnText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 16,
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#374151',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
