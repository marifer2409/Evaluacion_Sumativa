import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';

import { ThemedText } from './themed-text';

type MenuItemProps = {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
  destructive?: boolean;
};

export function MenuItem({
  icon,
  title,
  description,
  onPress,
  destructive = false,
}: MenuItemProps) {
  const { theme } = useAppTheme();
  const itemColor = destructive ? theme.danger : theme.text;

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.item}>
      <View style={[styles.iconWrap, { backgroundColor: theme.surfaceAlt }]}>
        <ThemedText style={{ color: itemColor, fontSize: 19 }}>{icon}</ThemedText>
      </View>
      <View style={styles.copy}>
        <ThemedText type="smallBold" style={{ color: itemColor }}>
          {title}
        </ThemedText>
        <ThemedText type="caption" themeColor="muted">
          {description}
        </ThemedText>
      </View>
      <ThemedText type="smallBold" themeColor="muted">
        ›
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: 3 },
});
