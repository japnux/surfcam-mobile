/**
 * Surfcam Design System - Colors
 * Based on the web app color scheme (dark theme)
 */

const tintColorLight = '#0ea5e9'; // Sky blue
const tintColorDark = '#0ea5e9';

export const Colors = {
  light: {
    text: '#0f172a',
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#64748b',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorLight,
    card: '#f8fafc',
    border: '#e2e8f0',
    muted: '#94a3b8',
    primary: '#0ea5e9',
    secondary: '#1e293b',
    destructive: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  dark: {
    text: '#f8fafc',
    background: '#0f172a',
    tint: tintColorDark,
    icon: '#94a3b8',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorDark,
    card: '#1e293b',
    border: '#334155',
    muted: '#64748b',
    primary: '#0ea5e9',
    secondary: '#334155',
    destructive: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
};
