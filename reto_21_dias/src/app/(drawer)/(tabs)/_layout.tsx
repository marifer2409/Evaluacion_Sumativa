import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';

const tabIcons: Record<string, string> = {
  index: '⌂',
  habits: '✓',
  progress: '◷',
};

export default function TabLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 66,
          paddingTop: 7,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color }) => (
          <Text style={{ color, fontSize: 21, lineHeight: 25 }}>
            {tabIcons[route.name] ?? '•'}
          </Text>
        ),
      })}>
      <Tabs.Screen name="index" options={{ title: 'Hoy', tabBarLabel: 'Hoy' }} />
      <Tabs.Screen name="habits" options={{ title: 'Hábitos', tabBarLabel: 'Hábitos' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progreso', tabBarLabel: 'Progreso' }} />
    </Tabs>
  );
}
