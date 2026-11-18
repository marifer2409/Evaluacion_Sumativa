import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ProgressCard } from '@/components/progress-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function TodayScreen() {
  const { theme } = useAppTheme();
  const { selectedDay, progress, completedCount, habits, toggleHabit } = useHabits();
  const dateLabel = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(new Date());

  return (
    <ThemedView className="flex-1" style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="eyebrow" themeColor="muted">
          {dateLabel.toLocaleUpperCase('es-ES')}
        </ThemedText>
        <View style={styles.heading}>
          <ThemedText type="title">Un día{'\n'}a la vez.</ThemedText>
          <ThemedText themeColor="muted">
            Pequeños pasos, grandes cambios. Hoy es el día {selectedDay} de tu reto.
          </ThemedText>
        </View>

        <ThemedView style={[styles.challengeCard, { backgroundColor: theme.primary }]}>
          <View style={styles.challengeTop}>
            <View>
              <ThemedText type="eyebrow" style={{ color: theme.primarySoft }}>
                TU RETO PERSONAL
              </ThemedText>
              <ThemedText type="cardTitle" style={styles.challengeTitle}>
                21 días de progreso
              </ThemedText>
            </View>
            <View style={[styles.dayBadge, { backgroundColor: theme.primarySoft }]}>
              <ThemedText type="smallBold" style={{ color: theme.primary }}>
                DÍA {selectedDay}
              </ThemedText>
            </View>
          </View>
          <ThemedText style={[styles.challengeDescription, { color: theme.primarySoft }]}>
            La constancia de hoy es el cambio que buscas mañana.
          </ThemedText>
          <View style={[styles.challengeTrack, { backgroundColor: 'rgba(255,255,255,0.22)' }]}>
            <View
              style={[
                styles.challengeFill,
                {
                  width: `${Math.round((selectedDay / 21) * 100)}%`,
                  backgroundColor: theme.primarySoft,
                },
              ]}
            />
          </View>
          <ThemedText type="small" style={{ color: theme.primarySoft }}>
            {21 - selectedDay} días por delante
          </ThemedText>
        </ThemedView>

        <ProgressCard
          title="Tu avance de hoy"
          completed={completedCount}
          total={habits.length}
          percentage={progress}
        />

        <View style={styles.sectionHeading}>
          <View>
            <ThemedText type="sectionTitle">Hábitos de hoy</ThemedText>
            <ThemedText type="small" themeColor="muted">
              {completedCount === habits.length
                ? '¡Día completado! Sigue así.'
                : 'Cada marca cuenta. Tú puedes.'}
            </ThemedText>
          </View>
          <ThemedText
            type="link"
            style={{ color: theme.primary }}
            onPress={() => router.push('/habits')}>
            Ver todos
          </ThemedText>
        </View>

        <View style={styles.habitList}>
          {habits.slice(0, 3).map((habit) => (
            <ThemedView key={habit.id} style={styles.quickHabit}>
              <View style={[styles.habitEmoji, { backgroundColor: theme.surfaceAlt }]}>
                <ThemedText style={styles.emoji}>{habit.emoji}</ThemedText>
              </View>
              <View style={styles.habitCopy}>
                <ThemedText type="smallBold">{habit.name}</ThemedText>
                <ThemedText type="caption" themeColor="muted">
                  {habit.duration}
                </ThemedText>
              </View>
              <ThemedText
                type="link"
                style={{ color: theme.primary }}
                onPress={() => toggleHabit(habit.id)}>
                {habit.completed ? '✓' : '+'}
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        <ThemedView style={[styles.quoteCard, { backgroundColor: theme.surfaceAlt }]}>
          <ThemedText type="quote">
            “No tienes que ser perfecto, solo tienes que empezar.”
          </ThemedText>
          <ThemedText type="caption" themeColor="muted">
            TU RECORDATORIO DE HOY
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 28, gap: 20 },
  heading: { gap: 8, marginTop: -12 },
  challengeCard: { borderRadius: 24, padding: 20, gap: 14 },
  challengeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  challengeTitle: { color: '#FFFFFF', marginTop: 5 },
  dayBadge: { borderRadius: 99, paddingHorizontal: 11, paddingVertical: 7 },
  challengeDescription: { lineHeight: 21, maxWidth: 260 },
  challengeTrack: { height: 7, borderRadius: 8, overflow: 'hidden', marginTop: 2 },
  challengeFill: { height: '100%', borderRadius: 8 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  habitList: { gap: 10, marginTop: -10 },
  quickHabit: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 12,
    gap: 12,
  },
  habitEmoji: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 21 },
  habitCopy: { flex: 1, gap: 2 },
  quoteCard: { borderRadius: 20, padding: 18, gap: 8 },
});
