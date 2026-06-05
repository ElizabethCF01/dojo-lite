import { Link, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { type Quiz, useQuizzes } from '#features/quizzes';
import { Button, Icon, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';

export default function QuizzesList() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { quizzes, loading, error, refresh } = useQuizzes(id);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const renderItem = ({ item }: { item: Quiz }) => (
    <View style={styles.card}>
      <Typography variant="subtitle">{item.title}</Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Quizzes' }} />
      <View style={styles.toolbar}>
        <Link
          href={{ pathname: '/classes/[id]/quizzes/new', params: { id } }}
          asChild
        >
          <Button label="New quiz" size="sm" />
        </Link>
      </View>
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
