import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '#shared/ui';
import { useStudents } from '../../../src/modlets/students';

export default function StudentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { students, addPoint, removePoint } = useStudents();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.missing}>Student not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: student.name }} />
      <View style={styles.card}>
        <Avatar seed={student.name} backgroundColor="E0E7FF" />
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.points}>{student.points} pts</Text>

        <View style={styles.row}>
          <Pressable
            style={[styles.btn, styles.minus]}
            onPress={() => removePoint(student.id)}
          >
            <Text style={styles.btnText}>-1</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.plus]}
            onPress={() => addPoint(student.id)}
          >
            <Text style={styles.btnText}>+1</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  points: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  plus: { backgroundColor: '#10B981' },
  minus: { backgroundColor: '#EF4444' },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  missing: {
    color: '#6B7280',
    fontSize: 16,
  },
});
