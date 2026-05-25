import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StudentsProvider } from '../src/modlets/students';

export default function RootLayout() {
  return (
    <StudentsProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-student"
          options={{
            presentation: 'modal',
            title: 'Add student',
          }}
        />
      </Stack>
    </StudentsProvider>
  );
}
