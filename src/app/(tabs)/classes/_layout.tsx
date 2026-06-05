import { Stack } from 'expo-router';

export default function ClassesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#4F46E5' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Classes' }} />
      <Stack.Screen name="[id]" options={{ title: 'Class' }} />
    </Stack>
  );
}
