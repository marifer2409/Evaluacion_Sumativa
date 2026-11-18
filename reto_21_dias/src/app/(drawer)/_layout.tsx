import { Drawer, DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAppTheme } from '@/hooks/use-app-theme';

function DrawerBrand() {
  const { theme } = useAppTheme();

  return (
    <ThemedView style={{ padding: 20, gap: 8, marginBottom: 8 }}>
      <ThemedView
        style={{
          width: 48,
          height: 48,
          borderRadius: 17,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.primary,
        }}>
        <ThemedText style={{ color: '#FFFFFF', fontSize: 23 }}>✦</ThemedText>
      </ThemedView>
      <ThemedText type="cardTitle">Reto 21 días</ThemedText>
      <ThemedText type="small" themeColor="muted">
        Tu espacio para crecer, día a día.
      </ThemedText>
    </ThemedView>
  );
}

export default function DrawerLayout() {
  const { theme } = useAppTheme();

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerBrand />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        headerTitleStyle: { fontWeight: '700' },
        drawerStyle: { backgroundColor: theme.surface, width: 290 },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.muted,
        drawerActiveBackgroundColor: theme.surfaceAlt,
        drawerLabelStyle: { fontWeight: '600', marginLeft: -12 },
        drawerItemStyle: { borderRadius: 14, marginHorizontal: 12 },
        sceneStyle: { backgroundColor: theme.background },
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Reto 21 días',
          drawerLabel: 'Inicio y hábitos',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Perfil y ajustes',
          drawerLabel: 'Perfil y ajustes',
        }}
      />
    </Drawer>
  );
}
