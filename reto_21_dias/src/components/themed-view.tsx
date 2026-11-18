import { View, type ViewProps } from 'react-native';

import { type ThemeColor } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

export type ThemedViewProps = ViewProps & {
  className?: string;
  type?: ThemeColor;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, className, type, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { theme, scheme } = useAppTheme();
  const backgroundColor =
    (scheme === 'dark' ? darkColor : lightColor) ?? theme[type ?? 'surface'];

  return (
    <View
      className={className}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
