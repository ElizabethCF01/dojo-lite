import { StyleSheet, View } from 'react-native';
import { useAuth } from '#features/auth';
import { Avatar, Button, Flair, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar seed={user.name} config={user.avatar} size={120} />
        <Typography variant="title">{user.name}</Typography>
        <Typography variant="body" color="textSecondary">
          {user.email}
        </Typography>
        <Flair label={user.role} tone="brand" />
      </View>

      <Button label="Log out" variant="danger" onPress={logout} fullWidth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
  },
});
