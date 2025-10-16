/**
 * Favorites Screen
 * Display user's favorite spots
 */

import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SpotCard } from '@/components/spot/SpotCard';
import { Loading } from '@/components/ui/Loading';
import { useSpots } from '@/hooks/useSpots';
import { useFavorites } from '@/hooks/useFavorites';
import { useLocation } from '@/hooks/useLocation';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';
import { calculateDistance } from '@/lib/utils/distance';

export default function FavoritesScreen() {
  const { data: allSpots, isLoading, refetch } = useSpots();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { location } = useLocation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading || favoritesLoading) {
    return <Loading message="Chargement des favoris..." />;
  }

  // Filter and sort favorite spots
  const favoriteSpots = allSpots
    ?.filter(spot => favorites.includes(spot.id))
    .map(spot => ({
      ...spot,
      distance: location && spot.latitude && spot.longitude
        ? calculateDistance(
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: spot.latitude, longitude: spot.longitude }
          )
        : Infinity
    }))
    .sort((a, b) => a.distance - b.distance) || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteSpots}
        renderItem={({ item }) => <SpotCard spot={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.dark.primary}
            colors={[Colors.dark.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="star-outline" size={64} color={Colors.dark.muted} />
            <Text style={styles.emptyTitle}>Aucun favori</Text>
            <Text style={styles.emptyText}>
              Ajoutez des spots à vos favoris pour les retrouver facilement ici
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  listContent: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.dark.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
