export const Colors = {
  light: {
    text: '#1C2A24',
    muted: '#75827B',
    background: '#F6F7F4',
    backgroundElement: '#EEF2ED',
    backgroundSelected: '#E4E9E3',
    textSecondary: '#75827B',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF2ED',
    border: '#E4E9E3',
    primary: '#397A58',
    primarySoft: '#DDEBDD',
    danger: '#B8524C',
  },
  dark: {
    text: '#EAF0EA',
    muted: '#9CAAA0',
    background: '#111813',
    backgroundElement: '#253329',
    backgroundSelected: '#34443A',
    textSecondary: '#9CAAA0',
    surface: '#1A241D',
    surfaceAlt: '#253329',
    border: '#34443A',
    primary: '#397A58',
    primarySoft: '#C6E3CF',
    danger: '#EF938B',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColor = keyof (typeof Colors)['light'];

export const Fonts = {
  sans: 'normal',
  serif: 'serif',
  rounded: 'normal',
  mono: 'monospace',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = 80;
export const MaxContentWidth = 800;
