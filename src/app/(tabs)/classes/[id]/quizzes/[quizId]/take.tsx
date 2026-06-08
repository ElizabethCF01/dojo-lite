import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Icon, Typography } from '#design/elements';
import { colors, radii, spacing } from '#design/foundations';
import {
  type QuizOption,
  type QuizQuestion,
  useQuiz,
  useSubmitAttempt,
} from '#features/quizzes';

export default function TakeQuiz() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();
  const { quiz, loading, error } = useQuiz(quizId);
  const { submit, submitting, result } = useSubmitAttempt(quizId);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const total = quiz?.questions.length ?? 0;
  const answeredAll = useMemo(
    () => total > 0 && Object.keys(selected).length === total,
    [selected, total],
  );

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

  if (result) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: quiz?.title ?? 'Quiz' }} />
        <Icon name="circle-check" size={48} color="success" solid />
        <Typography variant="title">
          {result.score} / {result.totalQuestions}
        </Typography>
        <Typography variant="body" color="textSecondary">
          Quiz submitted
        </Typography>
        <Button label="Done" onPress={() => router.back()} />
      </View>
    );
  }

  const onSubmit = async () => {
    if (!answeredAll || submitting) return;
    setSubmitError(null);
    const answers = Object.entries(selected).map(
      ([questionId, selectedOptionId]) => ({ questionId, selectedOptionId }),
    );
    await submit(answers);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: quiz?.title ?? 'Quiz' }} />
      {quiz?.questions.map((q, qi) => (
        <QuestionBlock
          key={q.id}
          question={q}
          index={qi}
          selectedOptionId={selected[q.id]}
          onSelect={(optionId) =>
            setSelected((prev) => ({ ...prev, [q.id]: optionId }))
          }
        />
      ))}

      {(submitError || error) && (
        <Typography variant="caption" color="danger">
          {submitError ?? error}
        </Typography>
      )}

      <Button
        label={submitting ? 'Submitting…' : 'Submit answers'}
        onPress={onSubmit}
        disabled={!answeredAll || submitting}
        fullWidth
      />
    </ScrollView>
  );
}

function QuestionBlock({
  question,
  index,
  selectedOptionId,
  onSelect,
}: {
  question: QuizQuestion;
  index: number;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Typography variant="caption" color="textSecondary">
        Question {index + 1}
      </Typography>
      <Typography variant="subtitle">{question.text}</Typography>
      <View style={styles.options}>
        {question.options.map((o) => (
          <OptionRow
            key={o.id}
            option={o}
            selected={o.id === selectedOptionId}
            onPress={() => onSelect(o.id)}
          />
        ))}
      </View>
    </View>
  );
}

function OptionRow({
  option,
  selected,
  onPress,
}: {
  option: QuizOption;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.optionRow, selected && styles.optionSelected]}
    >
      <Icon
        name={selected ? 'circle-dot' : 'circle'}
        size={20}
        color={selected ? 'brand' : 'textMuted'}
        solid={selected}
      />
      <Typography
        variant="body"
        color={selected ? 'textPrimary' : 'textSecondary'}
      >
        {option.text}
      </Typography>
    </Pressable>
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
    gap: spacing.sm,
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
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.brand,
    backgroundColor: colors.brandSoft,
  },
});
