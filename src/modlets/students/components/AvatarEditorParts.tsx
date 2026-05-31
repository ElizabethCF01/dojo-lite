import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import type { AvatarConfig } from '#shared/design/elements';
import { Avatar, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';
import type { ColorOption } from './avatarOptions';
import { DEFAULT_AVATAR_CONFIG } from './avatarOptions';

const THUMB_SIZE = 56;
const THUMB_SEED = 'preview';

type TraitSectionProps = {
  title: string;
  options: { value: string }[];
  selected: string | undefined;
  traitKey: keyof AvatarConfig;
  onSelect: (value: string) => void;
};

export function TraitSection({
  title,
  options,
  selected,
  traitKey,
  onSelect,
}: TraitSectionProps) {
  return (
    <View style={styles.section}>
      <Typography variant="label" style={styles.sectionTitle}>
        {title}
      </Typography>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={options}
        keyExtractor={(item) => item.value}
        contentContainerStyle={styles.row}
        renderItem={({ item }) => {
          const isSelected = selected === item.value;
          return (
            <Pressable
              onPress={() => onSelect(item.value)}
              style={[styles.thumb, isSelected && styles.thumbSelected]}
            >
              <Avatar
                seed={THUMB_SEED}
                size={THUMB_SIZE}
                config={{ ...DEFAULT_AVATAR_CONFIG, [traitKey]: item.value }}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

type ColorSectionProps = {
  title: string;
  colorOptions: ColorOption[];
  selected: string | undefined;
  onSelect: (value: string) => void;
};

export function ColorSection({
  title,
  colorOptions,
  selected,
  onSelect,
}: ColorSectionProps) {
  return (
    <View style={styles.section}>
      <Typography variant="label" style={styles.sectionTitle}>
        {title}
      </Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {colorOptions.map((c) => (
            <ColorSwatch
              key={c.value}
              color={c.value}
              selected={selected === c.value}
              onPress={() => onSelect(c.value)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export function ColorSwatch({
  color,
  selected,
  onPress,
}: {
  color: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.swatch,
        { backgroundColor: `#${color}` },
        selected && styles.swatchSelected,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingBottom: spacing.xs,
  },
  thumb: {
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbSelected: {
    borderColor: colors.brand,
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchSelected: {
    borderColor: colors.brand,
    borderWidth: 3,
  },
});
