import { Link, Stack, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useAuth } from '#features/auth';
import {
  type RosterStudent,
  type Standing,
  useLeaderboard,
  useRoster,
} from '#features/classes';
import {
  Avatar,
  Button,
  Flair,
  Icon,
  Typography,
} from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';
import { formatPoints } from '#shared/design/helpers';

export default function ClassDetail() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name ?? 'Class' }} />
      {user?.role === 'teacher' ? (
        <TeacherView classId={id} />
      ) : (
        <StudentView classId={id} selfId={user?.id} />
      )}
    </View>
  );
}

function TeacherView({ classId }: { classId: string }) {
  const { students, loading, error, award } = useRoster(classId);

  if (loading) return <Centered loading />;
  if (error) return <Centered error={error} />;

  const renderItem = ({ item }: { item: RosterStudent }) => (
    <View style={styles.row}>
      <View style={styles.left}>
        <Avatar seed={item.name} config={item.avatar} />
        <View>
          <Typography variant="label">{item.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {formatPoints(item.points)}
          </Typography>
        </View>
      </View>
      <View style={styles.actions}>
        <Button
          label="-1"
          variant="danger"
          size="sm"
          onPress={() => award(item.id, -1)}
        />
        <Button
          label="+1"
          variant="success"
          size="sm"
          onPress={() => award(item.id, 1)}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
      ListHeaderComponent={<QuizzesLink classId={classId} />}
      ListEmptyComponent={<EmptyRoster />}
    />
  );
}

function QuizzesLink({ classId }: { classId: string }) {
  return (
    <Link
      href={{ pathname: '/classes/[id]/quizzes', params: { id: classId } }}
      asChild
    >
      <Pressable style={styles.quizzesLink}>
        <View style={styles.left}>
          <Icon name="clipboard-question" size={20} color="brand" />
          <Typography variant="label">Quizzes</Typography>
        </View>
        <Icon name="chevron-right" size={16} color="textMuted" />
      </Pressable>
    </Link>
  );
}

function StudentView({
  classId,
  selfId,
}: {
  classId: string;
  selfId?: string;
}) {
  const { students, loading, error } = useLeaderboard(classId);

  if (loading) return <Centered loading />;
  if (error) return <Centered error={error} />;

  const ranked = [...students].sort((a, b) => b.points - a.points);

  const renderItem = ({ item, index }: { item: Standing; index: number }) => (
    <View style={[styles.row, item.id === selfId && styles.selfRow]}>
      <View style={styles.left}>
        <Typography variant="label" color="textSecondary">
          {index + 1}
        </Typography>
        <Avatar seed={item.name} config={item.avatar} />
        <Typography variant="label">{item.name}</Typography>
      </View>
      <Flair label={formatPoints(item.points)} tone="brand" />
    </View>
  );

  return (
    <FlatList
      data={ranked}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
      ListHeaderComponent={<QuizzesLink classId={classId} />}
      ListEmptyComponent={<EmptyRoster />}
    />
  );
}

function Centered({ loading, error }: { loading?: boolean; error?: string }) {
  return (
    <View style={styles.centered}>
      {loading ? (
        <ActivityIndicator color={colors.brand} />
      ) : (
        <Typography variant="label" color="danger">
          {error}
        </Typography>
      )}
    </View>
  );
}

function EmptyRoster() {
  return (
    <View style={styles.empty}>
      <Icon name="user-group" size={32} color="textMuted" />
      <Typography variant="label" color="textSecondary">
        No students enrolled yet
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: spacing.lg,
    gap: spacing.md,
    flexGrow: 1,
  },
  row: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selfRow: {
    borderColor: colors.brand,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quizzesLink: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
  },
});
