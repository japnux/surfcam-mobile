/**
 * Badge component
 * Small colored label for status indicators
 */

import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius, FontSize } from '@/constants/Spacing';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant]]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: Colors.dark.secondary,
  },
  success: {
    backgroundColor: Colors.dark.success + '20',
  },
  warning: {
    backgroundColor: Colors.dark.warning + '20',
  },
  destructive: {
    backgroundColor: Colors.dark.destructive + '20',
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  defaultText: {
    color: Colors.dark.text,
  },
  successText: {
    color: Colors.dark.success,
  },
  warningText: {
    color: Colors.dark.warning,
  },
  destructiveText: {
    color: Colors.dark.destructive,
  },
});
