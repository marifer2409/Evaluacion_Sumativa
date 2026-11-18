import { Pressable, StyleSheet, View } from 'react-native';

import type { Habit } from '@/data/habits';
import { useAppTheme } from '@/hooks/use-app-theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type HabitCardProps = {
  habit: Habit & { completed: boolean };
  onToggle: () => void;
};

export function HabitCard({ habit, onToggle }: HabitCardProps) {
  const { theme } = useAppTheme();

  return (
    <ThemedView style={styles.card}>
      <View style={[styles.emojiWrap, { backgroundColor: theme.surfaceAlt }]}>
        <ThemedText style={styles.emoji}>{habit.emoji}</ThemedText>
      </View>
      <View style={styles.description}>
        <ThemedText type="smallBold">{habit.name}</ThemedText>
        <ThemedText type="caption" themeColor="muted">
          {habit.description}
        </ThemedText>
        <ThemedText type="caption" style={{ color: theme.primary, marginTop: 3 }}>
          {habit.duration}
        </ThemedText>
      </View>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={habit.name}
        accessibilityState={{ checked: habit.completed }}
        onPress={onToggle}
        style={[
          styles.checkbox,
          {
            backgroundColor: habit.completed ? theme.primary : 'transparent',
            borderColor: habit.completed ? theme.primary : theme.border,
          },
        ]}>
        <ThemedText style={[styles.checkmark, { color: habit.completed ? '#FFFFFF' : theme.muted }]}>
          {habit.completed ? '✓' : ''}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 19, padding: 14, gap: 12 },
  emojiWrap: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 23 },
  description: { flex: 1, gap: 3 },
  checkbox: { width: 28, height: 28, borderRadius: 9, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  checkmark: { fontSize: 16, fontWeight: '800', lineHeight: 20 },
});
