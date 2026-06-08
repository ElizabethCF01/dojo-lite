import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Flair, Icon, Typography } from '#design/elements';
import { colors, radii, spacing } from '#design/foundations';
import { markOnboardingSeen } from '#shared/onboarding';

const classImage = require('../../../assets/images/class-image.png');

const SLIDES = [
  {
    icon: 'chalkboard-user',
    title: 'Create classes',
    text: 'Spin up a class and share a join code with your students.',
  },
  {
    icon: 'list-check',
    title: 'Run quizzes',
    text: 'Build quizzes and see how everyone did at a glance.',
  },
] as const;

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const getStarted = () => {
    markOnboardingSeen();
    router.replace('/login');
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing['2xl'],
          paddingBottom: insets.bottom + spacing['2xl'],
        },
      ]}
    >
      <View style={styles.hero}>
        <Flair label="Welcome" tone="brand" />
        <View style={styles.imageWrap}>
          <View style={styles.imageGlow} />
          <Image
            source={classImage}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Typography variant="display">DojoLite</Typography>
        <Typography variant="body" color="textSecondary" style={styles.tagline}>
          Your classroom, organized.
        </Typography>
      </View>

      <View style={styles.slides}>
        {SLIDES.map((slide) => (
          <View key={slide.icon} style={styles.slide}>
            <View style={styles.iconBadge}>
              <Icon name={slide.icon} size={20} color="brand" />
            </View>
            <View style={styles.slideCopy}>
              <Typography variant="subtitle">{slide.title}</Typography>
              <Typography variant="caption" color="textSecondary">
                {slide.text}
              </Typography>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button label="Get started" fullWidth onPress={getStarted} />
        <Typography variant="caption" color="textMuted" style={styles.footnote}>
          Log in or create an account next.
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing['2xl'],
    justifyContent: 'space-between',
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  imageWrap: {
    width: '100%',
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  imageGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: radii.full,
    backgroundColor: colors.brandSoft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagline: {
    textAlign: 'center',
  },
  slides: {
    gap: spacing.md,
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  footer: {
    gap: spacing.md,
    alignItems: 'center',
  },
  footnote: {
    textAlign: 'center',
  },
});
