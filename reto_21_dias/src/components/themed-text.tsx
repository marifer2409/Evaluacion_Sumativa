import { StyleSheet, Text, type TextProps } from 'react-native';

import { type ThemeColor } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

export type ThemedTextProps = TextProps & {
  className?: string;
  type?: 'default' | 'title' | 'sectionTitle' | 'cardTitle' | 'small' | 'smallBold' | 'caption' | 'eyebrow' | 'quote' | 'percentage' | 'stat' | 'link' | 'subtitle' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  className,
  type = 'default',
  themeColor = 'text',
  ...rest
}: ThemedTextProps) {
  const { theme } = useAppTheme();

  return (
    <Text
      className={className}
      style={[{ color: theme[themeColor] }, styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: { fontSize: 15, lineHeight: 22, fontWeight: '500' },
  title: { fontSize: 36, lineHeight: 40, fontWeight: '800', letterSpacing: -1.3 },
  sectionTitle: { fontSize: 17, lineHeight: 23, fontWeight: '700' },
  cardTitle: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  small: { fontSize: 13, lineHeight: 19, fontWeight: '500' },
  smallBold: { fontSize: 14, lineHeight: 20, fontWeight: '700' },
  caption: { fontSize: 11, lineHeight: 16, fontWeight: '500' },
  eyebrow: { fontSize: 10, lineHeight: 15, fontWeight: '800', letterSpacing: 1.8 },
  quote: { fontSize: 15, lineHeight: 22, fontWeight: '700' },
  percentage: { fontSize: 23, lineHeight: 28, fontWeight: '800' },
  stat: { fontSize: 25, lineHeight: 31, fontWeight: '800' },
  link: { fontSize: 13, lineHeight: 20, fontWeight: '700' },
  subtitle: { fontSize: 28, lineHeight: 36, fontWeight: '700' },
  linkPrimary: { fontSize: 14, lineHeight: 30, color: '#397A58' },
  code: { fontFamily: 'monospace', fontSize: 12, fontWeight: '600' },
});
