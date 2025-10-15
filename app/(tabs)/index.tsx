/**
 * Home Screen - Liste des spots
 * Affiche tous les spots disponibles avec recherche
 */

import { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SpotCard } from '@/components/spot/SpotCard';
import { Loading } from '@/components/ui/Loading';
import { useSpots, useSearchSpots } from '@/hooks/useSpots';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/Spacing';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: allSpots, isLoading, error } = useSpots();
  const { data: searchResults } = useSearchSpots(searchQuery);

  const spots = searchQuery.length > 2 ? searchResults : allSpots;

  if (isLoading) {
    return <Loading message="Chargement des spots..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={Colors.dark.destructive} />
        <Text style={styles.errorText}>Erreur de chargement</Text>
        <Text style={styles.errorSubtext}>Impossible de charger les spots</Text>
      </View>
    );
  }

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
      <FlatList
        data={spots}
        renderItem={({ item }) => <SpotCard spot={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={48} color={Colors.dark.muted} />
            <Text style={styles.emptyText}>Aucun spot trouvé</Text>
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
