import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Typography } from '#shared/design/elements';
import { colors, palette, radii, spacing } from '#shared/design/foundations';
import { formatPoints } from '#shared/design/helpers';

type StudentCardProps = {
  name: string;
  points: number;
  onAddPoint: () => void;
};

function avatarBgFor(points: number): string {
  if (points >= 5) return palette.emerald[500];
  if (points < 0) return palette.red[500];
  return palette.neutral[100];
}

export function StudentCard({ name, points, onAddPoint }: StudentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Avatar seed={name} backgroundColor={avatarBgFor(points)} />
        <View>
          <Typography variant="label">{name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {formatPoints(points)}
          </Typography>
        </View>
      </View>
      <Button label="+1" variant="success" size="sm" onPress={onAddPoint} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
