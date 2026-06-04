import { Stack } from 'expo-router';
import { AuthGate } from '#features/auth';

export default function ClassesLayout() {
  return (
    <AuthGate>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Classes' }} />
      </Stack>
    </AuthGate>
  );
}
