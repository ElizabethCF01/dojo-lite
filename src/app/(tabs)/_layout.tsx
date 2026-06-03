import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#4F46E5' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#4F46E5',
      }}
    >
      <Tabs.Screen
        name="students"
        options={{
          title: 'Students',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="users" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="circle-info" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
