import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StudentCard } from '../../../src/components/StudentCard';
import { useStudents } from '../../../src/store/students';

export default function StudentsIndex() {
  const { students, addPoint } = useStudents();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.count}>{students.length} students</Text>
        <Pressable
          style={styles.addBtn}
          onPress={() => router.push('/add-student')}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {students.map((s) => (
          <Link
            key={s.id}
            href={{ pathname: '/students/[id]', params: { id: s.id } }}
            asChild
          >
            <Pressable>
              <StudentCard
                name={s.name}
                points={s.points}
                onAddPoint={() => addPoint(s.id)}
              />
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  count: {
    color: '#6B7280',
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
});
