import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AuthForm, useAuth } from '#features/auth';
import { Button, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';

export default function ClassesIndex() {
  const { status, user, logout } = useAuth();

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.brand} />
      </View>
    );
  }

  if (status === 'guest') {
    return (
      <View style={styles.container}>
        <AuthForm />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.authed}>
        <Typography variant="subtitle">
          Hi {user?.name ?? user?.email}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Signed in as {user?.role}
        </Typography>
        <Button label="Log out" variant="ghost" size="sm" onPress={logout} />
      </View>
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
  authed: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
});
