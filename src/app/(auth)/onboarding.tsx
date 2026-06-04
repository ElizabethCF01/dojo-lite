import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Icon, Typography } from '#shared/design/elements';
import { colors, spacing } from '#shared/design/foundations';

const SLIDES = [
  {
    icon: 'chalkboard-user',
    text: 'Create classes and share a join code with your students.',
  },
  { icon: 'list-check', text: 'Build quizzes and see how everyone did.' },
] as const;

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.hero}>
        <Icon name="graduation-cap" size={72} color="brand" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['2xl'],
    justifyContent: 'space-between',
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
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
