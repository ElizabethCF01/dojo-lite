import { Stack } from 'expo-router';

export default function StudentsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#4F46E5' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Students' }} />
      <Stack.Screen name="[id]" options={{ title: 'Student' }} />
    </Stack>
  );
}
