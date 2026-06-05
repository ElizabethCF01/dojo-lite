import { useCallback, useState } from 'react';
import { ApiError } from '#shared/api';
import { submitAttempt } from '../api';
import type { Attempt } from '../types';

export function useSubmitAttempt(quizId: string) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Attempt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (answers: { questionId: string; selectedOptionId: string }[]) => {
      setSubmitting(true);
      setError(null);
      try {
        const data = await submitAttempt(quizId, answers);
        setResult(data.attempt);
      } catch (err) {
        setError(
          err instanceof ApiError ? err.message : 'Failed to submit answers',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [quizId],
  );

  return { submit, submitting, result, error };
}
