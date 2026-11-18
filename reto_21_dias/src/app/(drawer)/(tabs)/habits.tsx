import { ScrollView, StyleSheet, View } from 'react-native';

import { HabitCard } from '@/components/habit-card';
import { ProgressCard } from '@/components/progress-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function HabitsScreen() {
  const { theme } = useAppTheme();
  const { habits, selectedDay, setSelectedDay, toggleHabit, completedCount, progress } = useHabits();

  return (
    <ThemedView className="flex-1" style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="eyebrow" themeColor="muted">
          CONSTRUYE TU RUTINA
        </ThemedText>
        <ThemedText type="title">Hábitos</ThemedText>
        <ThemedText themeColor="muted">
          Marca lo que cumplas. La constancia se construye con acciones pequeñas.
        </ThemedText>

        <ProgressCard
          title={`Día ${selectedDay} de 21`}
          completed={completedCount}
          total={habits.length}
          percentage={progress}
        />

        <View style={styles.daySection}>
          <View style={styles.sectionHeader}>
            <ThemedText type="sectionTitle">Elige un día</ThemedText>
            <ThemedText type="small" themeColor="muted">
              {selectedDay}/21
            </ThemedText>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayList}>
            {Array.from({ length: 21 }, (_, index) => index + 1).map((day) => {
              const isSelected = day === selectedDay;
              return (
                <ThemedText
                  key={day}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedDay(day)}
                  style={[
                    styles.dayButton,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.surface,
                      color: isSelected ? '#FFFFFF' : theme.muted,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}>
                  {day}
                </ThemedText>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText type="sectionTitle">Tus 4 hábitos</ThemedText>
          <ThemedText type="small" themeColor="muted">
            {completedCount}/{habits.length} listos
          </ThemedText>
        </View>

        <View style={styles.habitList}>
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onToggle={() => toggleHabit(habit.id)} />
          ))}
        </View>

        <ThemedView style={[styles.tip, { backgroundColor: theme.surfaceAlt }]}>
          <ThemedText type="smallBold">Un consejo para hoy</ThemedText>
          <ThemedText type="small" themeColor="muted">
            Enfócate en el siguiente hábito, no en los 21 días completos. Lo importante es volver a
            intentarlo cada día.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 28, gap: 16 },
  daySection: { gap: 12, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dayList: { gap: 8, paddingRight: 20 },
  dayButton: {
    overflow: 'hidden',
    width: 42,
    height: 42,
    borderRadius: 15,
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 9,
    fontSize: 14,
    fontWeight: '700',
  },
  habitList: { gap: 11 },
  tip: { padding: 16, borderRadius: 18, gap: 6 },
});
