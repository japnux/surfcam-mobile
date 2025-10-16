/**
 * Map Screen
 * Display spots on a map with user location
 */

import { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSpots } from '@/hooks/useSpots';
import { useLocation } from '@/hooks/useLocation';
import { Loading } from '@/components/ui/Loading';
import { VideoPlayer } from '@/components/spot/VideoPlayer';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { calculateDistance, formatDistance } from '@/lib/utils/distance';

export default function MapScreen() {
  const { data: spots, isLoading: spotsLoading } = useSpots();
  const { location, loading: locationLoading } = useLocation();
  const mapRef = useRef<MapView>(null);
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);

  if (spotsLoading || locationLoading) {
    return <Loading message="Chargement de la carte..." />;
  }

  // Default region (France)
  const initialRegion = {
    latitude: location?.coords.latitude || 46.603354,
    longitude: location?.coords.longitude || 1.888334,
    latitudeDelta: 8,
    longitudeDelta: 8,
  };

  const handleMarkerPress = (spotId: string) => {
    setSelectedSpot(spotId);
  };

  const handleCalloutPress = (spotId: string) => {
    router.push(`/spot/${spotId}`);
  };

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.135, // ~15km radius
        longitudeDelta: 0.135,
      });
    }
  };

  // Compter les spots avec coordonnées
  const spotsWithCoords = spots?.filter(s => s.latitude && s.longitude && s.latitude !== 0 && s.longitude !== 0) || [];

  // Get selected spot info
  const selectedSpotData = selectedSpot && spots ? spots.find(s => s.id === selectedSpot) : null;
  const selectedSpotDistance = selectedSpotData && location && selectedSpotData.latitude && selectedSpotData.longitude
    ? calculateDistance(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: selectedSpotData.latitude, longitude: selectedSpotData.longitude }
      )
    : null;

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapSection}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={initialRegion}
          showsUserLocation={!!location}
          showsMyLocationButton={false}
        >
          {spots?.map((spot) => {
            if (!spot.latitude || !spot.longitude || spot.latitude === 0 || spot.longitude === 0) return null;

            const distance = location
              ? calculateDistance(
                  { latitude: location.coords.latitude, longitude: location.coords.longitude },
                  { latitude: spot.latitude, longitude: spot.longitude }
                )
              : null;

            return (
              <Marker
                key={spot.id}
                coordinate={{
                  latitude: spot.latitude,
                  longitude: spot.longitude,
                }}
                onPress={() => handleMarkerPress(spot.id)}
                pinColor={selectedSpot === spot.id ? Colors.dark.primary : Colors.dark.secondary}
              >
                <View style={styles.markerContainer}>
                  <View style={[
                    styles.marker,
                    selectedSpot === spot.id && styles.markerSelected
                  ]}>
                    <Ionicons
                      name="location"
                      size={24}
                      color={selectedSpot === spot.id ? Colors.dark.primary : Colors.dark.text}
                    />
                  </View>
                  {distance !== null && distance < 50 && (
                    <View style={styles.distanceBadge}>
                      <Text style={styles.distanceText}>{formatDistance(distance)}</Text>
                    </View>
                  )}
                </View>
              </Marker>
            );
          })}
        </MapView>

        {/* Info message if no spots with coordinates */}
        {spotsWithCoords.length === 0 && (
          <View style={styles.infoMessage}>
            <Ionicons name="information-circle" size={24} color={Colors.dark.warning} />
            <Text style={styles.infoText}>
              Aucun spot n'a de coordonnées GPS pour le moment
            </Text>
          </View>
        )}

        {/* Center on user button */}
        {location && (
          <TouchableOpacity style={styles.centerButton} onPress={centerOnUser}>
            <Ionicons name="locate" size={24} color={Colors.dark.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Video Section */}
      <View style={styles.videoSection}>
        {selectedSpotData ? (
          <>
            <TouchableOpacity
              style={styles.spotVideoHeader}
              onPress={() => handleCalloutPress(selectedSpot!)}
            >
              <View style={styles.spotVideoInfo}>
                <Text style={styles.spotVideoName} numberOfLines={1}>
                  {selectedSpotData.name}
                </Text>
                {selectedSpotDistance !== null && (
                  <Text style={styles.spotVideoDistance}>
                    📍 {formatDistance(selectedSpotDistance)}
                  </Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.dark.muted} />
            </TouchableOpacity>
            
            {selectedSpotData.cam_url && (
              <VideoPlayer
                url={selectedSpotData.cam_url}
                type={selectedSpotData.cam_type || 'hls'}
                spotName={selectedSpotData.name}
              />
            )}
          </>
        ) : (
          <View style={styles.emptyVideoState}>
            <Ionicons name="videocam-outline" size={48} color={Colors.dark.muted} />
            <Text style={styles.emptyVideoText}>
              Sélectionnez un spot sur la carte
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  mapSection: {
    flex: 2,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  videoSection: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 4,
    borderWidth: 2,
    borderColor: Colors.dark.border,
  },
  markerSelected: {
    borderColor: Colors.dark.primary,
    backgroundColor: Colors.dark.primary + '20',
  },
  distanceBadge: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  distanceText: {
    color: Colors.dark.background,
    fontSize: 10,
    fontWeight: '600',
  },
  infoMessage: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark.text,
  },
  centerButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.dark.card,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  spotVideoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  spotVideoInfo: {
    flex: 1,
    gap: 4,
  },
  spotVideoName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  spotVideoDistance: {
    fontSize: 12,
    color: Colors.dark.primary,
    fontWeight: '500',
  },
  emptyVideoState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyVideoText: {
    marginTop: Spacing.md,
    fontSize: 14,
    color: Colors.dark.muted,
    textAlign: 'center',
  },
});
