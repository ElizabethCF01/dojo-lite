import { FontAwesome6 } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { type ColorToken, colors } from '../../foundations';

type FAProps = ComponentProps<typeof FontAwesome6>;

type IconProps = {
  name: FAProps['name'];
  size?: number;
  color?: ColorToken;
  solid?: boolean;
};

export function Icon({
  name,
  size = 18,
  color = 'textPrimary',
  solid = false,
}: IconProps) {
  return (
    <FontAwesome6
      name={name}
      size={size}
      color={colors[color]}
      iconStyle={solid ? 'solid' : 'regular'}
    />
  );
}
