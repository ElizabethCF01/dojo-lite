import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Button, Icon, Typography } from '#design/elements';
import { colors, fontSize, radii, spacing } from '#design/foundations';
import { useAuth } from '#features/auth';
import { type ClassItem, useClasses } from '#features/classes';
import { ApiError } from '#shared/api';

export default function ClassesIndex() {
  const { user } = useAuth();
  const { classes, loading, error, refresh, create, join } = useClasses();
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const isTeacher = user?.role === 'teacher';

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const submit = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setBusy(true);
    setActionError(null);
    try {
      await (isTeacher ? create(trimmed) : join(trimmed));
      setInput('');
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : 'Something went wrong',
      );
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.brand} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: ClassItem }) => (
    <Link
      href={{
        pathname: '/classes/[id]',
        params: { id: item.id, name: item.name },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        <Typography variant="subtitle">{item.name}</Typography>
        {isTeacher && (
          <Typography variant="caption" color="textSecondary">
            Join code: {item.joinCode}
          </Typography>
        )}
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.createRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={isTeacher ? 'New class name' : 'Class code'}
          autoCapitalize={isTeacher ? 'sentences' : 'characters'}
          style={styles.input}
        />
        <Button
          label={isTeacher ? 'Create' : 'Join'}
          size="sm"
          onPress={submit}
          disabled={busy}
        />
      </View>

      {(actionError || error) && (
        <Typography variant="caption" color="danger" style={styles.error}>
          {actionError ?? error}
        </Typography>
      )}

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="chalkboard-user" size={32} color="textMuted" />
            <Typography variant="label" color="textSecondary">
              No classes yet
            </Typography>
            <Typography variant="caption" color="textMuted">
              {isTeacher
                ? 'Create your first class above.'
                : 'Join one with a class code.'}
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  error: {
    paddingHorizontal: spacing.lg,
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
