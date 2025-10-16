/**
 * Home Screen - Liste des spots
 * Affiche tous les spots disponibles avec recherche
 */

import { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SpotCard } from '@/components/spot/SpotCard';
import { SpotCardSkeleton } from '@/components/spot/SpotCardSkeleton';
import { useSpots, useSearchSpots } from '@/hooks/useSpots';
import { useLocation } from '@/hooks/useLocation';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/Spacing';
import { calculateDistance } from '@/lib/utils/distance';
import type { Spot } from '@/lib/types';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { data: allSpots, isLoading, error, refetch } = useSpots();
  const { data: searchResults } = useSearchSpots(searchQuery);
  const { location } = useLocation();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Trier les spots par distance si la localisation est disponible
  const spots = useMemo(() => {
    const baseSpots = searchQuery.length > 2 ? searchResults : allSpots;
    
    if (!baseSpots || !location) return baseSpots;
    
    // Calculer la distance pour chaque spot et trier
    return [...baseSpots]
      .map(spot => ({
        ...spot,
        distance: spot.latitude && spot.longitude
          ? calculateDistance(
              { latitude: location.coords.latitude, longitude: location.coords.longitude },
              { latitude: spot.latitude, longitude: spot.longitude }
            )
          : Infinity
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [allSpots, searchResults, searchQuery, location]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.dark.muted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un spot..."
          placeholderTextColor={Colors.dark.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Ionicons
            name="close-circle"
            size={20}
            color={Colors.dark.muted}
            onPress={() => setSearchQuery('')}
            style={styles.clearIcon}
          />
        )}
      </View>

      {/* Spots List */}
      {isLoading ? (
        <View style={styles.listContent}>
          {[...Array(5)].map((_, i) => (
            <SpotCardSkeleton key={i} />
          ))}
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={Colors.dark.destructive} />
          <Text style={styles.errorText}>Erreur de chargement</Text>
          <Text style={styles.errorSubtext}>Impossible de charger les spots</Text>
        </View>
      ) : (
        <FlatList
          data={spots}
          renderItem={({ item }) => <SpotCard spot={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
              <Ionicons name="location-outline" size={48} color={Colors.dark.muted} />
              <Text style={styles.emptyText}>Aucun spot trouvé</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    margin: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  clearIcon: {
    marginLeft: Spacing.sm,
  },
  listContent: {
    padding: Spacing.md,
    paddingTop: 0,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: Spacing.md,
  },
  errorSubtext: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
    marginTop: Spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.dark.muted,
    marginTop: Spacing.md,
  },
});
