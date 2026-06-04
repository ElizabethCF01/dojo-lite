import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '#features/auth';
import { StudentsProvider } from '#features/students';

export default function RootLayout() {
  return (
    <AuthProvider>
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
          <Stack.Screen
            name="edit-avatar"
            options={{
              presentation: 'modal',
              title: 'Edit Avatar',
            }}
          />
        </Stack>
      </StudentsProvider>
    </AuthProvider>
  );
}
