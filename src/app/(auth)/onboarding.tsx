import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Icon, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';

const classImage = require('../../../assets/images/class-image.png');

const SLIDES = [
  {
    icon: 'chalkboard-user',
    text: 'Create classes and share a join code with your students.',
  },
  { icon: 'list-check', text: 'Build quizzes and see how everyone did.' },
] as const;

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing['3xl'],
          paddingBottom: insets.bottom + spacing['2xl'],
        },
      ]}
    >
      <View style={styles.hero}>
        <Image source={classImage} style={styles.image} resizeMode="contain" />
        <Typography variant="display">DojoLite</Typography>
        <Typography variant="body" color="textSecondary">
          Your classroom, organized.
        </Typography>
      </View>

      <View style={styles.slides}>
        {SLIDES.map((slide) => (
          <View key={slide.icon} style={styles.slide}>
            <Icon name={slide.icon} size={24} color="brand" />
            <Typography variant="body" style={styles.slideText}>
              {slide.text}
            </Typography>
          </View>
        ))}
      </View>

      <Button
        label="Get started"
        fullWidth
        onPress={() => router.push('/login')}
      />
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
  image: {
    width: '100%',
    height: 240,
    marginBottom: spacing.md,
  },
  slides: {
    gap: spacing.lg,
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  slideText: {
    flex: 1,
  },
});
