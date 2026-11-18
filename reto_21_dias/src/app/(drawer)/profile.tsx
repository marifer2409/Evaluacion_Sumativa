import { Alert, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { MenuItem } from '@/components/menu-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function ProfileScreen() {
  const { scheme, setScheme, theme } = useAppTheme();
  const { overallProgress, completedDays, resetProgress } = useHabits();

  return (
    <ThemedView className="flex-1" style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="eyebrow" themeColor="muted">
          TU CAMINO, A TU RITMO
        </ThemedText>
        <ThemedText type="title">Perfil</ThemedText>

        <ThemedView style={styles.profileCard}>
          <View style={[styles.avatar, { backgroundColor: theme.primarySoft }]}>
            <ThemedText style={{ fontSize: 32 }}>🌱</ThemedText>
          </View>
          <ThemedText type="cardTitle">Mi reto personal</ThemedText>
          <ThemedText type="small" themeColor="muted">
            Construyendo hábitos, un día a la vez.
          </ThemedText>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <ThemedText type="stat" style={{ color: theme.primary }}>
                {overallProgress}%
              </ThemedText>
              <ThemedText type="caption" themeColor="muted">
                AVANCE
              </ThemedText>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
            <View style={styles.stat}>
              <ThemedText type="stat" style={{ color: theme.primary }}>
                {completedDays}
              </ThemedText>
              <ThemedText type="caption" themeColor="muted">
                DÍAS ACTIVOS
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedText type="sectionTitle">Preferencias</ThemedText>
        <ThemedView style={styles.settingsCard}>
          <View style={styles.themeRow}>
            <View style={styles.themeCopy}>
              <ThemedText type="smallBold">Modo oscuro</ThemedText>
              <ThemedText type="caption" themeColor="muted">
                Elige el tema que te resulte más cómodo.
              </ThemedText>
            </View>
            <Switch
              accessibilityLabel="Activar modo oscuro"
              value={scheme === 'dark'}
              onValueChange={(enabled) => setScheme(enabled ? 'dark' : 'light')}
              trackColor={{ false: theme.border, true: theme.primarySoft }}
              thumbColor={scheme === 'dark' ? theme.primary : '#FFFFFF'}
            />
          </View>
          <View style={[styles.separator, { backgroundColor: theme.border }]} />
          <MenuItem
            icon="↻"
            title="Reiniciar mi progreso"
            description="Borra las marcas de los 21 días."
            onPress={() =>
              Alert.alert('Reiniciar progreso', 'Se borrarán las marcas de los 21 días.', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Reiniciar', style: 'destructive', onPress: resetProgress },
              ])
            }
            destructive
          />
        </ThemedView>

        <ThemedView style={[styles.aboutCard, { backgroundColor: theme.surfaceAlt }]}>
          <ThemedText type="smallBold">Reto 21 días</ThemedText>
          <ThemedText type="small" themeColor="muted">
            Una aplicación para acompañarte en la creación de rutinas positivas. Tus avances se
            mantienen localmente durante esta sesión.
          </ThemedText>
          <ThemedText type="caption" themeColor="muted">
            VERSIÓN 1.0.0 · EXPO + REACT NATIVE
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 28, gap: 16 },
  profileCard: { alignItems: 'center', borderRadius: 22, padding: 22, gap: 7 },
  avatar: { width: 76, height: 76, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  stats: { flexDirection: 'row', alignItems: 'center', marginTop: 14, width: '100%' },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statDivider: { width: 1, height: 38 },
  settingsCard: { borderRadius: 20, paddingHorizontal: 16 },
  themeRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  themeCopy: { flex: 1, gap: 4, paddingRight: 12 },
  separator: { height: StyleSheet.hairlineWidth },
  aboutCard: { padding: 18, borderRadius: 18, gap: 8 },
});
