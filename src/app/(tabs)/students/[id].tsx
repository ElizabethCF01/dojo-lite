import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useStudents } from '#features/students';
import { Avatar, Button, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';
import { formatPoints } from '#shared/design/helpers';

export default function StudentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { students, addPoint, removePoint } = useStudents();
  const router = useRouter();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <View style={styles.container}>
        <Typography variant="body" color="textSecondary">
          Student not found.
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: student.name }} />
      <View style={styles.card}>
        <Avatar seed={student.name} size={100} config={student.avatar} />
        <Button
          label="Edit Avatar"
          variant="ghost"
          size="sm"
          onPress={() =>
            router.push({
              pathname: '/edit-avatar',
              params: { id: student.id },
            })
          }
        />
        <Typography variant="title" style={styles.name}>
          {student.name}
        </Typography>
        <Typography variant="body" color="textSecondary" style={styles.points}>
          {formatPoints(student.points)}
        </Typography>

        <View style={styles.row}>
          <Button
            label="-1"
            variant="danger"
            onPress={() => removePoint(student.id)}
          />
          <Button
            label="+1"
            variant="success"
            onPress={() => addPoint(student.id)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing['2xl'],
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: {
    marginTop: spacing.sm,
  },
  points: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
