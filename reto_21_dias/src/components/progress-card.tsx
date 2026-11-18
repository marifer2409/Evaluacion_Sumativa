import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type ProgressCardProps = {
  title: string;
  completed: number;
  total: number;
  percentage: number;
};

export function ProgressCard({ title, completed, total, percentage }: ProgressCardProps) {
  const { theme } = useAppTheme();
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <ThemedView style={styles.card}>
      <View style={styles.heading}>
        <View style={styles.titleBlock}>
          <ThemedText type="smallBold">{title}</ThemedText>
          <ThemedText type="caption" themeColor="muted">
            {completed} de {total} hábitos completados
          </ThemedText>
        </View>
        <ThemedText type="percentage" style={{ color: theme.primary }}>
          {safePercentage}%
        </ThemedText>
      </View>
      <View style={[styles.track, { backgroundColor: theme.surfaceAlt }]}>
        <View
          style={[
            styles.fill,
            { width: `${safePercentage}%`, backgroundColor: theme.primary },
          ]}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18, borderRadius: 20, gap: 15 },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  titleBlock: { flex: 1, gap: 3 },
  percentage: { fontSize: 23, fontWeight: '800' },
  track: { height: 9, borderRadius: 8, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 8 },
});
