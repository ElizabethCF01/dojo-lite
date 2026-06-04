import { StyleSheet, View } from 'react-native';
import { useAuth } from '#features/auth';
import { Button, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';

export default function ClassesIndex() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Typography variant="subtitle">Hi {user?.name ?? user?.email}</Typography>
      <Typography variant="caption" color="textSecondary">
        Signed in as {user?.role}
      </Typography>
      <Button label="Log out" variant="ghost" size="sm" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.sm,
  },
});
