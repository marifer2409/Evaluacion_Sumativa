import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ProgressCard } from '@/components/progress-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function ProgressScreen() {
  const { theme } = useAppTheme();
  const {
    selectedDay,
    setSelectedDay,
    progress,
    completedCount,
    habits,
    overallProgress,
    completedDays,
    progressForDay,
  } = useHabits();

  return (
    <ThemedView className="flex-1" style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="eyebrow" themeColor="muted">
          CADA PASO SUMA
        </ThemedText>
        <ThemedText type="title">Tu progreso</ThemedText>
        <ThemedText themeColor="muted">
          Mira cuánto has avanzado y celebra cada día que lo intentas.
        </ThemedText>

        <ProgressCard
          title={`Día ${selectedDay} · avance diario`}
          completed={completedCount}
          total={habits.length}
          percentage={progress}
        />

        <ThemedView style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <ThemedText type="stat" style={{ color: theme.primary }}>
              {overallProgress}%
            </ThemedText>
            <ThemedText type="caption" themeColor="muted">
              RETO COMPLETADO
            </ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.summaryItem}>
            <ThemedText type="stat" style={{ color: theme.primary }}>
              {completedDays}
            </ThemedText>
            <ThemedText type="caption" themeColor="muted">
              DÍAS CON AVANCE
            </ThemedText>
          </View>
        </ThemedView>

        <View style={styles.sectionHeader}>
          <View>
            <ThemedText type="sectionTitle">Calendario del reto</ThemedText>
            <ThemedText type="small" themeColor="muted">
              Toca un día para revisar tus hábitos.
            </ThemedText>
          </View>
          <ThemedText type="smallBold" style={{ color: theme.primary }}>
            21 días
          </ThemedText>
        </View>

        <ThemedView style={styles.calendarCard}>
          <View style={styles.calendarGrid}>
            {Array.from({ length: 21 }, (_, index) => index + 1).map((day) => {
              const dayProgress = progressForDay(day);
              const isSelected = day === selectedDay;
              const backgroundColor =
                dayProgress === 100
                  ? theme.primary
                  : dayProgress > 0
                    ? theme.primarySoft
                    : theme.surfaceAlt;
              const color = dayProgress === 100 ? '#FFFFFF' : theme.text;

              return (
                <ThemedText
                  key={day}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => {
                    setSelectedDay(day);
                    router.push('/habits');
                  }}
                  style={[
                    styles.calendarDay,
                    {
                      backgroundColor,
                      color,
                      borderColor: isSelected ? theme.text : 'transparent',
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}>
                  {day}
                </ThemedText>
              );
            })}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.surfaceAlt }]} />
              <ThemedText type="caption" themeColor="muted">
                Por empezar
              </ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.primarySoft }]} />
              <ThemedText type="caption" themeColor="muted">
                En progreso
              </ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.primary }]} />
              <ThemedText type="caption" themeColor="muted">
                Completo
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={[styles.encouragement, { backgroundColor: theme.surfaceAlt }]}>
          <ThemedText type="quote">“El progreso, no la perfección.”</ThemedText>
          <ThemedText type="small" themeColor="muted">
            Cada día es una nueva oportunidad para retomar tu camino.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 28, gap: 16 },
  summaryCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: { flex: 1, gap: 4, alignItems: 'center' },
  divider: { width: 1, height: 42 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calendarCard: { padding: 18, borderRadius: 20, gap: 17 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  calendarDay: {
    width: '12%',
    aspectRatio: 1,
    borderRadius: 13,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 8,
    fontSize: 13,
    fontWeight: '700',
  },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 9, height: 9, borderRadius: 5 },
  encouragement: { padding: 18, borderRadius: 18, gap: 6 },
});
