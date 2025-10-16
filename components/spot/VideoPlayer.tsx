/**
 * VideoPlayer component
 * Displays the spot webcam using expo-video
 */

import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/Spacing';

interface VideoPlayerProps {
  url: string;
  type: string;
  spotName: string;
}

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.5625; // 16:9 aspect ratio

export function VideoPlayer({ url, type, spotName }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  console.log('VideoPlayer - URL:', url, 'Type:', type);

  // Si pas d'URL, afficher un placeholder
  if (!url || url === 'null' || url === 'undefined') {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="videocam-outline" size={48} color={Colors.dark.muted} />
        <Text style={styles.errorText}>Webcam non disponible</Text>
        <Text style={styles.errorSubtext}>
          Aucune webcam configurée pour ce spot
        </Text>
      </View>
    );
  }

  // Expo Go ne supporte pas expo-video, afficher un placeholder
  // En dev build, Constants.appOwnership === 'expo' est false
  const isExpoGo = typeof expo !== 'undefined' && expo?.modules?.ExpoGo;

  if (isExpoGo) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="videocam-outline" size={48} color={Colors.dark.muted} />
        <Text style={styles.errorText}>Webcam</Text>
        <Text style={styles.errorSubtext}>
          Les vidéos nécessitent un Development Build
        </Text>
        <Text style={[styles.errorSubtext, { marginTop: 8, fontSize: 12 }]}>
          URL: {type?.toUpperCase() || 'N/A'}
        </Text>
      </View>
    );
  }

  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    player.play();
  });

  // Écouter les événements du player
  useEffect(() => {
    const subscription = player.addListener('statusChange', (status) => {
      console.log('Video status:', status.status);
      if (status.status === 'readyToPlay') {
        setIsLoading(false);
        setHasError(false);
      } else if (status.status === 'error') {
        console.error('Video error:', status.error);
        setIsLoading(false);
        setHasError(true);
      }
    });

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, [player]);

  if (hasError) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="videocam-off" size={48} color={Colors.dark.muted} />
        <Text style={styles.errorText}>Webcam indisponible</Text>
        <Text style={styles.errorSubtext}>Impossible de charger la vidéo</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="contain"
        nativeControls={true}
      />
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Ionicons name="videocam" size={48} color={Colors.dark.muted} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.dark.card,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
  },
  loadingText: {
    marginTop: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: Spacing.md,
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  errorSubtext: {
    marginTop: Spacing.xs,
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
  },
});
