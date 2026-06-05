import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '#features/auth';
import { hasSeenOnboarding } from '#shared/onboarding';

export default function Index() {
  const { status } = useAuth();
  const [seenOnboarding, setSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    hasSeenOnboarding().then(setSeenOnboarding);
  }, []);

  if (status === 'loading' || seenOnboarding === null) return null;
  if (status === 'authed') return <Redirect href="/classes" />;
  return <Redirect href={seenOnboarding ? '/login' : '/onboarding'} />;
}
