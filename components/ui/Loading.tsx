/**
 * Loading component
 * Centered loading indicator
 */

import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.dark.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  message: {
    marginTop: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.dark.muted,
  },
});
