import { StyleSheet, View } from 'react-native';
import { Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';

export default function Leaderboard() {
  return (
    <View style={styles.container}>
      <Typography variant="title">Leaderboard</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});
