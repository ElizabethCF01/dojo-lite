import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { getRoster, type RosterStudent } from '#features/classes';
import { ApiError } from '#shared/api';
import { Icon, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';

export default function ClassDetail() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const [students, setStudents] = useState<RosterStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await getRoster(id);
      setStudents(data.students);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load roster');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name ?? 'Class' }} />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.brand} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Typography variant="label" color="danger">
            {error}
          </Typography>
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Typography variant="body">{item.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {item.email}
              </Typography>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Icon name="user-group" size={32} color="textMuted" />
              <Typography variant="label" color="textSecondary">
                No students enrolled yet
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
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
  },
});
