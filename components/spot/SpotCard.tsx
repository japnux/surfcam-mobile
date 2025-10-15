/**
 * SpotCard component
 * Card displaying spot information in the list
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';
import { useFavorites } from '@/hooks/useFavorites';
import type { Spot } from '@/lib/types';

interface SpotCardProps {
  spot: Spot;
}

export function SpotCard({ spot }: SpotCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(spot.id);

  const handlePress = () => {
    router.push(`/spot/${spot.id}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(spot.id);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{spot.name}</Text>
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
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.xs / 2,
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
