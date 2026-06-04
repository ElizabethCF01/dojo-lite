import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useAuth } from '#features/auth';
import { type RosterStudent, useRoster } from '#features/classes';
import { Avatar, Button, Icon, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';
import { formatPoints } from '#shared/design/helpers';

export default function ClassDetail() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const { user } = useAuth();
  const { students, loading, error, award } = useRoster(id);

  const isTeacher = user?.role === 'teacher';

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
      {isTeacher && (
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
      )}
    </View>
  );

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
          renderItem={renderItem}
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
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
  },
});
