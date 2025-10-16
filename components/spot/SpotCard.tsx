/**
 * SpotCard component
 * Card displaying spot information in the list
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { memo, useEffect } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';
import { useFavorites } from '@/hooks/useFavorites';
import { formatDistance } from '@/lib/utils/distance';
import type { Spot } from '@/lib/types';

interface SpotCardProps {
  spot: Spot & { distance?: number };
}

export const SpotCard = memo(function SpotCard({ spot }: SpotCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(spot.id);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/spot/${spot.id}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(spot.id);
  };

  return (
    <Animated.View entering={FadeInDown.duration(300).springify()}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{spot.name}</Text>
              {spot.distance !== undefined && spot.distance !== Infinity && (
                <View style={styles.distanceBadge}>
                  <Ionicons name="location" size={12} color={Colors.dark.primary} />
                  <Text style={styles.distanceText}>{formatDistance(spot.distance)}</Text>
                </View>
              )}
            </View>
            <Text style={styles.location}>
              {spot.city ? `${spot.city}, ` : ''}{spot.region}
            </Text>
          </View>
          <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
            <Ionicons
              name={favorite ? 'star' : 'star-outline'}
              size={24}
              color={favorite ? Colors.dark.warning : Colors.dark.muted}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          {spot.break_type && (
            <Badge variant="default">{spot.break_type}</Badge>
          )}
          {spot.level && (
            <Badge variant={
              spot.level === 'Débutant' ? 'success' :
              spot.level === 'Intermédiaire' ? 'warning' :
              'destructive'
            }>
              {spot.level}
            </Badge>
          )}
        </View>

        {spot.orientation && (
          <View style={styles.info}>
            <Ionicons name="compass-outline" size={16} color={Colors.dark.muted} />
            <Text style={styles.infoText}>Orientation: {spot.orientation}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    // marginBottom handled by ItemSeparatorComponent in FlatList
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs / 2,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
    flex: 1,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.dark.primary + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.dark.primary,
  },
  location: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
  },
  favoriteButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  details: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
  },
});
