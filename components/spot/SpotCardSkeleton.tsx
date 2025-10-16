/**
 * SpotCardSkeleton component
 * Loading placeholder for SpotCard
 */

import { View, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Spacing } from '@/constants/Spacing';

export function SpotCardSkeleton() {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Skeleton width="70%" height={20} style={styles.title} />
          <Skeleton width="50%" height={14} />
        </View>
        <Skeleton width={24} height={24} borderRadius={12} />
      </View>

      <View style={styles.badges}>
        <Skeleton width={80} height={24} borderRadius={12} />
        <Skeleton width={100} height={24} borderRadius={12} />
      </View>

      <Skeleton width="60%" height={14} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  titleContainer: {
    flex: 1,
    gap: Spacing.xs / 2,
  },
  title: {
    marginBottom: Spacing.xs / 2,
  },
  badges: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
});
