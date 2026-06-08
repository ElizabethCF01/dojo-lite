import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Button, Icon, Typography } from '#design/elements';
import { colors, radii, spacing } from '#design/foundations';
import { useQuizzes } from '#features/quizzes';
import { ApiError } from '#shared/api';

type DraftOption = { key: string; text: string; isCorrect: boolean };
type DraftQuestion = { key: string; text: string; options: DraftOption[] };

let counter = 0;
const makeKey = () => `k${counter++}`;
const makeOption = (isCorrect = false): DraftOption => ({
  key: makeKey(),
  text: '',
  isCorrect,
});
const makeQuestion = (): DraftQuestion => ({
  key: makeKey(),
  text: '',
  options: [makeOption(true), makeOption()],
});

export default function NewQuiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { create } = useQuizzes(id);

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<DraftQuestion[]>(() => [
    makeQuestion(),
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editQuestion = (key: string, fn: (q: DraftQuestion) => DraftQuestion) =>
    setQuestions((prev) => prev.map((q) => (q.key === key ? fn(q) : q)));

  const setQuestionText = (key: string, text: string) =>
    editQuestion(key, (q) => ({ ...q, text }));

  const setOptionText = (qKey: string, oKey: string, text: string) =>
    editQuestion(qKey, (q) => ({
      ...q,
      options: q.options.map((o) => (o.key === oKey ? { ...o, text } : o)),
    }));

  const markCorrect = (qKey: string, oKey: string) =>
    editQuestion(qKey, (q) => ({
      ...q,
      options: q.options.map((o) => ({ ...o, isCorrect: o.key === oKey })),
    }));

  const addOption = (qKey: string) =>
    editQuestion(qKey, (q) =>
      q.options.length >= 6
        ? q
        : { ...q, options: [...q.options, makeOption()] },
    );

  const removeOption = (qKey: string, oKey: string) =>
    editQuestion(qKey, (q) => {
      if (q.options.length <= 2) return q;
      const options = q.options.filter((o) => o.key !== oKey);
      if (!options.some((o) => o.isCorrect)) options[0].isCorrect = true;
      return { ...q, options };
    });

  const addQuestion = () => setQuestions((prev) => [...prev, makeQuestion()]);

  const removeQuestion = (key: string) =>
    setQuestions((prev) =>
      prev.length <= 1 ? prev : prev.filter((q) => q.key !== key),
    );

  const canSubmit = useMemo(
    () =>
      title.trim().length > 0 &&
      questions.every(
        (q) =>
          q.text.trim().length > 0 &&
          q.options.every((o) => o.text.trim().length > 0),
      ),
    [title, questions],
  );

  const submit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await create(
        title.trim(),
        questions.map((q) => ({
          text: q.text.trim(),
          options: q.options.map((o) => ({
            text: o.text.trim(),
            isCorrect: o.isCorrect,
          })),
        })),
      );
      router.back();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create quiz');
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ title: 'New quiz' }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Typography variant="caption" color="textSecondary">
          Title
        </Typography>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Quiz title"
          style={styles.input}
        />

        {questions.map((q, qi) => (
          <View key={q.key} style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <Typography variant="label">Question {qi + 1}</Typography>
              <Pressable
                onPress={() => removeQuestion(q.key)}
                disabled={questions.length <= 1}
                hitSlop={8}
              >
                <Icon
                  name="trash"
                  size={16}
                  color={questions.length <= 1 ? 'textMuted' : 'danger'}
                />
              </Pressable>
            </View>
            <TextInput
              value={q.text}
              onChangeText={(t) => setQuestionText(q.key, t)}
              placeholder="Question text"
              style={styles.input}
            />

            {q.options.map((o) => (
              <View key={o.key} style={styles.optionRow}>
                <Pressable
                  onPress={() => markCorrect(q.key, o.key)}
                  hitSlop={8}
                >
                  <Icon
                    name={o.isCorrect ? 'circle-check' : 'circle'}
                    size={22}
                    color={o.isCorrect ? 'success' : 'textMuted'}
                    solid={o.isCorrect}
                  />
                </Pressable>
                <TextInput
                  value={o.text}
                  onChangeText={(t) => setOptionText(q.key, o.key, t)}
                  placeholder="Option text"
                  style={[styles.input, styles.optionInput]}
                />
                <Pressable
                  onPress={() => removeOption(q.key, o.key)}
                  disabled={q.options.length <= 2}
                  hitSlop={8}
                >
                  <Icon
                    name="xmark"
                    size={18}
                    color={
                      q.options.length <= 2 ? 'textMuted' : 'textSecondary'
                    }
                  />
                </Pressable>
              </View>
            ))}

            {q.options.length < 6 && (
              <Button
                label="Add option"
                variant="ghost"
                size="sm"
                onPress={() => addOption(q.key)}
              />
            )}
          </View>
        ))}

        <Button label="Add question" variant="ghost" onPress={addQuestion} />

        {error && (
          <Typography variant="caption" color="danger">
            {error}
          </Typography>
        )}

        <Button
          label={submitting ? 'Creating…' : 'Create quiz'}
          onPress={submit}
          disabled={!canSubmit || submitting}
          fullWidth
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionInput: {
    flex: 1,
  },
});
