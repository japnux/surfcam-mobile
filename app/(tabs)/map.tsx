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
import { Loading } from '@/components/shared/Loading';
import { Colors } from '@/constants/Colors';
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
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        showsUserLocation={!!location}
        showsMyLocationButton={false}
      >
        {spots?.map((spot) => {
          if (!spot.latitude || !spot.longitude) return null;

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

      {/* Center on user button */}
      {location && (
        <TouchableOpacity style={styles.centerButton} onPress={centerOnUser}>
          <Ionicons name="locate" size={24} color={Colors.dark.primary} />
        </TouchableOpacity>
      )}

      {/* Selected spot info */}
      {selectedSpot && spots && (
        <View style={styles.spotInfo}>
          {(() => {
            const spot = spots.find(s => s.id === selectedSpot);
            if (!spot) return null;

            const distance = location && spot.latitude && spot.longitude
              ? calculateDistance(
                  { latitude: location.coords.latitude, longitude: location.coords.longitude },
                  { latitude: spot.latitude, longitude: spot.longitude }
                )
              : null;

            return (
              <TouchableOpacity
                style={styles.spotInfoContent}
                onPress={() => handleCalloutPress(selectedSpot)}
              >
                <View style={styles.spotInfoHeader}>
                  <Text style={styles.spotName} numberOfLines={1}>
                    {spot.name}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color={Colors.dark.muted} />
                </View>
                <Text style={styles.spotLocation} numberOfLines={1}>
                  {spot.city}, {spot.region}
                </Text>
                {distance !== null && (
                  <Text style={styles.spotDistance}>
                    📍 {formatDistance(distance)}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  map: {
    flex: 1,
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
  centerButton: {
    position: 'absolute',
    bottom: 120,
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
  spotInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  spotInfoContent: {
    gap: 4,
  },
  spotInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    flex: 1,
  },
  spotLocation: {
    fontSize: 14,
    color: Colors.dark.muted,
  },
  spotDistance: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontWeight: '500',
    marginTop: 4,
  },
});
