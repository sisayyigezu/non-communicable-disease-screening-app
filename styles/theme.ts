export const lightTheme = {
  background: '#f6f7f8',
  surface: '#ffffff',
  surfaceDark: '#1a2632',
  card: '#ffffff',
  cardBorder: '#e2e8f0',
  textPrimary: '#0f172a',
  textSecondary: '#8f9bacff',
  textMuted: '#94a3b8',
  primary: '#137fec',
  primaryHover: '#0b5bb0',
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  shadow: 'rgba(0,0,0,0.06)',
};

export const darkTheme = {
  background: '#101922',
  surface: '#1a2632',
  surfaceDark: '#1a2632',
  card: '#1a2632',
  cardBorder: '#334155',
  textPrimary: '#ffffffff',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  primary: '#137fec',
  primaryHover: '#0b5bb0',
  blue50: '#1e3a8a',
  blue100: '#1e40af',
  slate50: '#0f172a',
  slate100: '#1e293b',
  slate400: '#64748b',
  slate500: '#94a3b8',
  slate600: '#cbd5e1',
  slate700: '#e2e8f0',
  slate800: '#f1f5f9',
  shadow: 'rgba(0,0,0,0.4)',
};

export const getTheme = (isDark: boolean) => isDark ? darkTheme : lightTheme;

export type Theme = typeof lightTheme
