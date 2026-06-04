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
import { useAuth } from '#features/auth';
import { type ClassItem, useClasses } from '#features/classes';
import { Button, Icon, Typography } from '#shared/design/elements';
import { colors, fontSize, radii, spacing } from '#shared/design/foundations';

export default function ClassesIndex() {
  const { user, logout } = useAuth();
  const { classes, loading, error, refresh, create } = useClasses();
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isTeacher = user?.role === 'teacher';

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const submit = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCreating(true);
    try {
      await create(trimmed);
      setName('');
    } finally {
      setCreating(false);
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
        <Typography variant="caption" color="textSecondary">
          Join code: {item.joinCode}
        </Typography>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Typography variant="label" color="textSecondary">
          {user?.name ?? user?.email}
        </Typography>
        <Button label="Log out" variant="ghost" size="sm" onPress={logout} />
      </View>

      {isTeacher && (
        <View style={styles.createRow}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="New class name"
            style={styles.input}
          />
          <Button
            label="Create"
            size="sm"
            onPress={submit}
            disabled={creating}
          />
        </View>
      )}

      {error && (
        <Typography variant="caption" color="danger" style={styles.error}>
          {error}
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
