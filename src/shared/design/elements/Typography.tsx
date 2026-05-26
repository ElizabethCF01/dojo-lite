import { Text, type TextProps, type TextStyle } from 'react-native';
import { type ColorToken, colors, fontSize, fontWeight } from '../foundations';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'label' | 'caption';

const variantStyles: Record<Variant, TextStyle> = {
  display: { fontSize: fontSize['2xl'], fontWeight: fontWeight.bold },
  title: { fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  subtitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold },
  body: { fontSize: fontSize.base, fontWeight: fontWeight.regular },
  label: { fontSize: fontSize.md, fontWeight: fontWeight.medium },
  caption: { fontSize: fontSize.sm, fontWeight: fontWeight.regular },
};

type TypographyProps = TextProps & {
  variant?: Variant;
  color?: ColorToken;
};

export function Typography({
  variant = 'body',
  color = 'textPrimary',
  style,
  ...rest
}: TypographyProps) {
  return (
    <Text
      style={[variantStyles[variant], { color: colors[color] }, style]}
      {...rest}
    />
  );
}
