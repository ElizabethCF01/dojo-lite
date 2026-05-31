import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';
import { pluralize } from '#shared/design/helpers';
import { StudentCard, useStudents } from '../../../src/modlets/students';

export default function StudentsIndex() {
  const { students, addPoint } = useStudents();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Typography variant="label" color="textSecondary">
          {pluralize(students.length, 'student')}
        </Typography>
        <Button
          label="Add"
          size="sm"
          onPress={() => router.push('/add-student')}
        />
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
                avatar={s.avatar}
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
    backgroundColor: colors.background,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  list: {
    padding: spacing.lg,
  },
});
