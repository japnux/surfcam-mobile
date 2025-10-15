/**
 * Spot Detail Screen
 * Displays webcam, current conditions, forecast, and tides
 */

import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { VideoPlayer } from '@/components/spot/VideoPlayer';
import { ConditionsBanner } from '@/components/shared/ConditionsBanner';
import { ForecastList } from '@/components/spot/ForecastList';
import { TideInfo } from '@/components/shared/TideInfo';
import { Loading } from '@/components/ui/Loading';
import { Badge } from '@/components/ui/Badge';
import { useSpot } from '@/hooks/useSpots';
import { useForecast } from '@/hooks/useForecast';
import { useTides } from '@/hooks/useTides';
import { useFavorites } from '@/hooks/useFavorites';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';

export default function SpotDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: spot, isLoading: spotLoading } = useSpot(id!);
  const { data: forecast, isLoading: forecastLoading } = useForecast(id!);
  const { data: tides, isLoading: tidesLoading } = useTides(id!);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (spotLoading) {
    return <Loading message="Chargement du spot..." />;
  }

  if (!spot) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={Colors.dark.destructive} />
        <Text style={styles.errorText}>Spot introuvable</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const favorite = isFavorite(spot.id);
  const currentConditions = forecast?.hourly[0];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.spotName} numberOfLines={1}>{spot.name}</Text>
          <Text style={styles.spotLocation}>{spot.city ? `${spot.city}, ` : ''}{spot.region}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(spot.id)} style={styles.favoriteButton}>
          <Ionicons
            name={favorite ? 'star' : 'star-outline'}
            size={24}
            color={favorite ? Colors.dark.warning : Colors.dark.muted}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Webcam */}
        <View style={styles.section}>
          <VideoPlayer url={spot.cam_url} type={spot.cam_type} spotName={spot.name} />
        </View>

        {/* Spot Info */}
        <View style={styles.section}>
          <View style={styles.badges}>
            {spot.break_type && <Badge>{spot.break_type}</Badge>}
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
            <View style={styles.infoRow}>
              <Ionicons name="compass-outline" size={16} color={Colors.dark.muted} />
              <Text style={styles.infoText}>Orientation: {spot.orientation}</Text>
            </View>
          )}
          
          {spot.best_wind && (
            <View style={styles.infoRow}>
              <Ionicons name="flag-outline" size={16} color={Colors.dark.muted} />
              <Text style={styles.infoText}>Vent idéal: {spot.best_wind}</Text>
            </View>
          )}
          
          {spot.best_tide && (
            <View style={styles.infoRow}>
              <Ionicons name="water-outline" size={16} color={Colors.dark.muted} />
              <Text style={styles.infoText}>Marée idéale: {spot.best_tide}</Text>
            </View>
          )}
        </View>

        {/* Current Conditions */}
        {currentConditions && (
          <View style={styles.section}>
            <ConditionsBanner current={currentConditions} />
          </View>
        )}

        {/* Forecast */}
        {forecast && forecast.hourly && forecast.hourly.length > 0 && (
          <ForecastList hourly={forecast.hourly} hoursToShow={48} />
        )}

        {/* Tides */}
        {tides && tides.events && tides.events.length > 0 && (
          <View style={styles.section}>
            <TideInfo events={tides.events} />
          </View>
        )}

        {/* Loading states */}
        {(forecastLoading || tidesLoading) && (
          <View style={styles.loadingSection}>
            <Text style={styles.loadingText}>Chargement des prévisions...</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.dark.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  backButton: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  headerTitle: {
    flex: 1,
  },
  spotName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  spotLocation: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
    marginTop: Spacing.xs / 2,
  },
  favoriteButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: Spacing.md,
  },
  badges: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
  },
  loadingSection: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
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
    marginBottom: Spacing.lg,
  },
  backButtonText: {
    fontSize: FontSize.md,
    color: Colors.dark.primary,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
