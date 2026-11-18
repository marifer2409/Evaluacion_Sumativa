import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { Appearance } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

import { Colors, type ColorScheme } from '@/constants/theme';

type AppThemeContextValue = {
  scheme: ColorScheme;
  theme: (typeof Colors)[ColorScheme];
  setScheme: (scheme: ColorScheme) => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [scheme, setScheme] = useState<ColorScheme>(
    () => (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light')
  );
  const { setColorScheme } = useNativeWindColorScheme();

  useEffect(() => {
    setColorScheme(scheme);
  }, [scheme, setColorScheme]);

  const value = useMemo(
    () => ({ scheme, theme: Colors[scheme], setScheme }),
    [scheme]
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme debe utilizarse dentro de AppThemeProvider.');
  }
  return context;
}
