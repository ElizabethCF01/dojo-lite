import {
  Pressable,
  type PressableProps,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { type ColorToken, colors, radii, spacing } from '../foundations';
import { Typography } from './Typography';

type Variant = 'primary' | 'success' | 'danger' | 'ghost';
type Size = 'sm' | 'md';

const backgrounds: Record<Variant, string> = {
  primary: colors.brand,
  success: colors.success,
  danger: colors.danger,
  ghost: 'transparent',
};

const labelColors: Record<Variant, ColorToken> = {
  primary: 'textOnBrand',
  success: 'textOnBrand',
  danger: 'textOnBrand',
  ghost: 'brand',
};

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  md: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
};

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        { backgroundColor: backgrounds[variant] },
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      <Typography
        variant={size === 'sm' ? 'label' : 'body'}
        color={labelColors[variant]}
        style={styles.label}
      >
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: '700',
  },
});
