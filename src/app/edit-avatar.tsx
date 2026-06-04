import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAuth } from '#features/auth';
import {
  BG_COLORS,
  ColorSection,
  DEFAULT_AVATAR_CONFIG,
  EYEBROWS_OPTIONS,
  EYES_OPTIONS,
  HAIR_COLORS,
  HAIR_OPTIONS,
  MOUTH_OPTIONS,
  SKIN_COLORS,
  TraitSection,
} from '#features/students';
import type { AvatarConfig } from '#shared/design/elements';
import { Avatar, Button, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';

const HAIR_TRAIT = HAIR_OPTIONS.map((value) => ({ value }));
const EYES_TRAIT = EYES_OPTIONS.map((value) => ({ value }));
const EYEBROWS_TRAIT = EYEBROWS_OPTIONS.map((value) => ({ value }));
const MOUTH_TRAIT = MOUTH_OPTIONS.map((value) => ({ value }));

export default function EditAvatar() {
  const { user, updateAvatar } = useAuth();
  const router = useRouter();
  const [draft, setDraft] = useState<AvatarConfig>(
    user?.avatar ?? { ...DEFAULT_AVATAR_CONFIG },
  );
  const [saving, setSaving] = useState(false);

  const set = useCallback(
    (key: keyof AvatarConfig) => (value: string) =>
      setDraft((prev) => ({ ...prev, [key]: value })),
    [],
  );

  if (!user) return null;

  const save = async () => {
    setSaving(true);
    try {
      await updateAvatar(draft);
      router.back();
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Avatar seed={user.name} size={120} config={draft} />
        <Typography variant="label" style={styles.previewName}>
          {user.name}
        </Typography>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TraitSection
          title="Hair"
          options={HAIR_TRAIT}
          selected={draft.hair}
          traitKey="hair"
          onSelect={set('hair')}
        />
        <ColorSection
          title="Hair Color"
          colorOptions={HAIR_COLORS}
          selected={draft.hairColor}
          onSelect={set('hairColor')}
        />
        <ColorSection
          title="Skin"
          colorOptions={SKIN_COLORS}
          selected={draft.skinColor}
          onSelect={set('skinColor')}
        />
        <TraitSection
          title="Eyes"
          options={EYES_TRAIT}
          selected={draft.eyes}
          traitKey="eyes"
          onSelect={set('eyes')}
        />
        <TraitSection
          title="Eyebrows"
          options={EYEBROWS_TRAIT}
          selected={draft.eyebrows}
          traitKey="eyebrows"
          onSelect={set('eyebrows')}
        />
        <TraitSection
          title="Mouth"
          options={MOUTH_TRAIT}
          selected={draft.mouth}
          traitKey="mouth"
          onSelect={set('mouth')}
        />
        <ColorSection
          title="Background"
          colorOptions={BG_COLORS}
          selected={draft.backgroundColor}
          onSelect={set('backgroundColor')}
        />

        <View style={styles.saveRow}>
          <Button label="Save" onPress={save} disabled={saving} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  preview: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  previewName: {
    marginTop: spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['2xl'],
  },
  saveRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
});
