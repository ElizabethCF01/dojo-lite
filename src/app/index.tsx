import { Redirect } from 'expo-router';
import { useAuth } from '#features/auth';

export default function Index() {
  const { status } = useAuth();
  if (status === 'loading') return null;
  return <Redirect href={status === 'authed' ? '/classes' : '/onboarding'} />;
}
