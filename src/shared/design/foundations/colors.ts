export const palette = {
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
  },
  emerald: {
    500: '#10B981',
    600: '#059669',
  },
  red: {
    500: '#EF4444',
    600: '#DC2626',
  },
  amber: {
    500: '#F59E0B',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F5F7FB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    400: '#9CA3AF',
    500: '#6B7280',
    700: '#374151',
    900: '#111827',
  },
} as const;

export const colors = {
  brand: palette.indigo[600],
  brandSoft: palette.indigo[100],
  success: palette.emerald[500],
  danger: palette.red[500],
  warning: palette.amber[500],

  background: palette.neutral[50],
  surface: palette.neutral[0],
  surfaceMuted: palette.neutral[100],

  textPrimary: palette.neutral[900],
  textSecondary: palette.neutral[500],
  textMuted: palette.neutral[400],
  textOnBrand: palette.neutral[0],

  border: palette.neutral[200],
} as const;

export type ColorToken = keyof typeof colors;
