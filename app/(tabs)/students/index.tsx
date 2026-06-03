import { Link, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Icon, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';
import { pluralize } from '#shared/design/helpers';
import {
  type Student,
  StudentCard,
  useStudents,
} from '../../../src/modlets/students';

export default function StudentsIndex() {
  const { students, addPoint } = useStudents();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Local data, so just settle the spinner after a beat — mirrors the
    // pull-to-refresh affordance users expect on a list.
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Student }) => (
      <Link
        href={{ pathname: '/students/[id]', params: { id: item.id } }}
        asChild
      >
        <Pressable>
          <StudentCard
            name={item.name}
            points={item.points}
            avatar={item.avatar}
            onAddPoint={() => addPoint(item.id)}
          />
        </Pressable>
      </Link>
    ),
    [addPoint],
  );

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

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="user-plus" size={32} color="textMuted" />
            <Typography variant="label" color="textSecondary">
              No students yet
            </Typography>
            <Typography variant="caption" color="textMuted">
              Tap Add to enroll your first student.
            </Typography>
          </View>
        }
      />
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
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
  },
});
