import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useRoster } from '#features/classes';
import { type Attempt, useAttempts } from '#features/quizzes';
import { Avatar, Flair, Icon, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';

export default function QuizAttempts() {
  const { id, quizId } = useLocalSearchParams<{ id: string; quizId: string }>();
  const { attempts, loading, error, refresh } = useAttempts(quizId);
  const { students } = useRoster(id);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const byId = useMemo(
    () => new Map(students.map((s) => [s.id, s])),
    [students],
  );

  const renderItem = ({ item }: { item: Attempt }) => {
    const student = byId.get(item.studentId);
    const name = student?.name ?? 'Unknown student';
    return (
      <View style={styles.row}>
        <View style={styles.left}>
          <Avatar seed={name} config={student?.avatar} />
          <Typography variant="label">{name}</Typography>
        </View>
        <Flair label={`${item.score} / ${item.totalQuestions}`} tone="brand" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Attempts' }} />
      {loading && attempts.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.brand} />
        </View>
      ) : (
        <FlatList
          data={attempts}
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
              <Icon name="clipboard-list" size={32} color="textMuted" />
              <Typography variant="label" color="textSecondary">
                No attempts yet
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
  },
});
