/**
 * Favorites Screen - Spots favoris
 * Affiche les spots mis en favoris par l'utilisateur
 */

import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SpotCard } from '@/components/spot/SpotCard';
import { Loading } from '@/components/ui/Loading';
import { useSpots } from '@/hooks/useSpots';
import { useFavorites } from '@/hooks/useFavorites';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';

export default function FavoritesScreen() {
  const { data: allSpots, isLoading } = useSpots();
  const { favorites, loading: favoritesLoading } = useFavorites();

  if (isLoading || favoritesLoading) {
    return <Loading message="Chargement des favoris..." />;
  }

  const favoriteSpots = allSpots?.filter(spot => favorites.includes(spot.id)) || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteSpots}
        renderItem={({ item }) => <SpotCard spot={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="star-outline" size={64} color={Colors.dark.muted} />
            <Text style={styles.emptyTitle}>Aucun favori</Text>
            <Text style={styles.emptyText}>
              Ajoutez des spots à vos favoris pour les retrouver facilement
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
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl * 2,
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
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
