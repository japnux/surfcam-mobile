/**
 * VideoPlayer component
 * Displays the spot webcam using expo-video
 */

import { useState } from 'react';
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

  // Expo Go ne supporte pas expo-video, afficher un placeholder
  const isExpoGo = !__DEV__ || typeof expo !== 'undefined';

  if (isExpoGo) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="videocam-outline" size={48} color={Colors.dark.muted} />
        <Text style={styles.errorText}>Webcam</Text>
        <Text style={styles.errorSubtext}>
          Les vidéos nécessitent un Development Build
        </Text>
        <Text style={[styles.errorSubtext, { marginTop: 8, fontSize: 12 }]}>
          URL: {type.toUpperCase()}
        </Text>
      </View>
    );
  }

  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    player.play();
  });

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
        contentFit="cover"
        nativeControls={false}
      />
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Ionicons name="videocam" size={48} color={Colors.dark.muted} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Ionicons name="videocam" size={16} color={Colors.dark.text} />
          <Text style={styles.badgeText}>EN DIRECT</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
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
  overlay: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.dark.destructive,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.dark.text,
  },
});
