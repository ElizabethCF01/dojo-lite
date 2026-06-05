import {
  Link,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useAuth } from '#features/auth';
import { type Quiz, useQuizzes } from '#features/quizzes';
import { Button, Icon, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';

export default function QuizzesList() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const { quizzes, loading, error, refresh } = useQuizzes(id);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const renderItem = ({ item }: { item: Quiz }) => (
    <Link
      href={{
        pathname: isTeacher
          ? '/classes/[id]/quizzes/[quizId]'
          : '/classes/[id]/quizzes/[quizId]/take',
        params: { id, quizId: item.id },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        <Typography variant="subtitle">{item.title}</Typography>
        <Icon name="chevron-right" size={16} color="textMuted" />
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Quizzes' }} />
      {isTeacher && (
        <View style={styles.toolbar}>
          <Button
            label="New quiz"
            size="sm"
            onPress={() =>
              router.push({
                pathname: '/classes/[id]/quizzes/new',
                params: { id },
              })
            }
          />
        </View>
      )}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.brand} />
        </View>
      ) : (
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            error ? (
              <Typography variant="caption" color="danger">
                {error}
              </Typography>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Icon name="clipboard-question" size={32} color="textMuted" />
              <Typography variant="label" color="textSecondary">
                No quizzes yet
              </Typography>
            </View>
          }
        />
      )}
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
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
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
