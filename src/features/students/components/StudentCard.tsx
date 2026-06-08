import { StyleSheet, View } from 'react-native';
import type { AvatarConfig } from '#design/elements';
import { Avatar, Button, Typography } from '#design/elements';
import { colors, radii, spacing } from '#design/foundations';
import { formatPoints } from '#design/helpers';

type StudentCardProps = {
  name: string;
  points: number;
  avatar?: AvatarConfig;
  onAddPoint: () => void;
};

export function StudentCard({
  name,
  points,
  avatar,
  onAddPoint,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Avatar seed={name} config={avatar} />
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
