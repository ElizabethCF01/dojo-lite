import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { type QuizOption, type QuizQuestion, useQuiz } from '#features/quizzes';
import { Button, Icon, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';

export default function QuizDetail() {
  const { id, quizId } = useLocalSearchParams<{ id: string; quizId: string }>();
  const router = useRouter();
  const { quiz, loading, error } = useQuiz(quizId);

  if (loading && !quiz) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: 'Quiz' }} />
        <ActivityIndicator color={colors.brand} />
      </View>
    );
  }

  if (error && !quiz) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: 'Quiz' }} />
        <Typography variant="label" color="danger">
          {error}
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: quiz?.title ?? 'Quiz' }} />
      <Button
        label="View attempts"
        variant="ghost"
        onPress={() =>
          router.push({
            pathname: '/classes/[id]/quizzes/[quizId]/attempts',
            params: { id, quizId },
          })
        }
      />
      {quiz?.questions.map((q, qi) => (
        <QuestionBlock key={q.id} question={q} index={qi} />
      ))}
    </ScrollView>
  );
}

function QuestionBlock({
  question,
  index,
}: {
  question: QuizQuestion;
  index: number;
}) {
  return (
    <View style={styles.card}>
      <Typography variant="caption" color="textSecondary">
        Question {index + 1}
      </Typography>
      <Typography variant="subtitle">{question.text}</Typography>
      <View style={styles.options}>
        {question.options.map((o) => (
          <OptionRow key={o.id} option={o} />
        ))}
      </View>
    </View>
  );
}

function OptionRow({ option }: { option: QuizOption }) {
  const correct = option.isCorrect === true;
  return (
    <View style={[styles.optionRow, correct && styles.optionCorrect]}>
      <Icon
        name={correct ? 'circle-check' : 'circle'}
        size={20}
        color={correct ? 'success' : 'textMuted'}
        solid={correct}
      />
      <Typography
        variant="body"
        color={correct ? 'textPrimary' : 'textSecondary'}
      >
        {option.text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  options: {
    gap: spacing.xs,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
  },
  optionCorrect: {
    backgroundColor: colors.brandSoft,
  },
});
