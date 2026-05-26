import { StyleSheet, View } from 'react-native';
import { type ColorToken, colors, radii, spacing } from '../foundations';
import { Typography } from './Typography';

type Tone = 'neutral' | 'success' | 'danger' | 'brand';

const toneBackgrounds: Record<Tone, string> = {
  neutral: colors.surfaceMuted,
  success: colors.success,
  danger: colors.danger,
  brand: colors.brandSoft,
};

const toneTextColors: Record<Tone, ColorToken> = {
  neutral: 'textSecondary',
  success: 'textOnBrand',
  danger: 'textOnBrand',
  brand: 'brand',
};

type FlairProps = {
  label: string;
  tone?: Tone;
};

export function Flair({ label, tone = 'neutral' }: FlairProps) {
  return (
    <View style={[styles.base, { backgroundColor: toneBackgrounds[tone] }]}>
      <Typography variant="caption" color={toneTextColors[tone]}>
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
});
