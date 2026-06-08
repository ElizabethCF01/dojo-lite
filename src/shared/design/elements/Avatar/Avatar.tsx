import { Image, StyleSheet, View } from 'react-native';
import { stripHash } from '../../helpers';

export type AvatarConfig = {
  hair?: string;
  hairColor?: string;
  eyes?: string;
  eyebrows?: string;
  mouth?: string;
  skinColor?: string;
  backgroundColor?: string;
};

type AvatarProps = {
  seed: string;
  size?: number;
  backgroundColor?: string;
  avatarStyle?: 'adventurer' | 'bottts' | 'thumbs' | 'avataaars';
  config?: AvatarConfig;
};

function buildUrl(
  seed: string,
  size: number,
  backgroundColor: string,
  style: string,
  config?: AvatarConfig,
): string {
  const bg = stripHash(config?.backgroundColor ?? backgroundColor);
  // No unencoded `[]` in the query: React Native's native Image loader rejects
  // such URLs. DiceBear accepts the bracket-free form for array params too.
  let url =
    `https://api.dicebear.com/10.x/${style}/png` +
    `?seed=${encodeURIComponent(seed)}` +
    `&size=${size * 2}` +
    `&radius=50` +
    `&backgroundColor=${bg}`;

  if (config?.hair) url += `&hairVariant=${config.hair}`;
  if (config?.hairColor) url += `&hairColor=${config.hairColor}`;
  if (config?.eyes) url += `&eyesVariant=${config.eyes}`;
  if (config?.eyebrows) url += `&eyebrowsVariant=${config.eyebrows}`;
  if (config?.mouth) url += `&mouthVariant=${config.mouth}`;
  if (config?.skinColor) url += `&skinColor=${config.skinColor}`;

  return url;
}

export function Avatar({
  seed,
  size = 50,
  backgroundColor = '4F46E5',
  avatarStyle = 'adventurer',
  config,
}: AvatarProps) {
  const uri = buildUrl(seed, size, backgroundColor, avatarStyle, config);

  return (
    <View
      style={[
        styles.wrapper,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
});
