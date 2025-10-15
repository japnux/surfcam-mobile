/**
 * ConditionsBanner component
 * Displays current surf conditions
 */

import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';
import { formatWaveHeight, formatWindSpeed, formatTemperature, getWindDirectionArrow } from '@/lib/utils/format';
import type { HourlyForecast } from '@/lib/types';

interface ConditionsBannerProps {
  current: HourlyForecast;
  tideHeight?: number;
}

export function ConditionsBanner({ current, tideHeight }: ConditionsBannerProps) {
  // Determine wave quality based on height and wind
  const getQuality = () => {
    if (!current.waveHeight) return 'default';
    if (current.waveHeight < 0.5) return 'destructive';
    if (current.waveHeight > 2.5) return 'warning';
    if (current.windSpeed && current.windSpeed > 30) return 'warning';
    return 'success';
  };

  const getQualityText = () => {
    const quality = getQuality();
    if (quality === 'success') return 'Bonnes conditions';
    if (quality === 'warning') return 'Conditions moyennes';
    return 'Conditions difficiles';
  };

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>Conditions actuelles</Text>
        <Badge variant={getQuality()}>{getQualityText()}</Badge>
      </View>

      <View style={styles.grid}>
        {/* Vagues */}
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Ionicons name="water" size={20} color={Colors.dark.primary} />
            <Text style={styles.itemLabel}>Vagues</Text>
          </View>
          <Text style={styles.itemValue}>{formatWaveHeight(current.waveHeight)}</Text>
          {current.wavePeriod && (
            <Text style={styles.itemSubtext}>Période: {current.wavePeriod}s</Text>
          )}
        </View>

        {/* Vent */}
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Ionicons name="flag" size={20} color={Colors.dark.primary} />
            <Text style={styles.itemLabel}>Vent</Text>
          </View>
          <View style={styles.windValue}>
            <Text style={styles.windArrow}>{getWindDirectionArrow(current.windDirection)}</Text>
            <Text style={styles.itemValue}>{formatWindSpeed(current.windSpeed)}</Text>
          </View>
          {current.windGust && (
            <Text style={styles.itemSubtext}>Rafales: {formatWindSpeed(current.windGust)}</Text>
          )}
        </View>

        {/* Marée */}
        {tideHeight !== undefined && (
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Ionicons name="trending-up" size={20} color={Colors.dark.primary} />
              <Text style={styles.itemLabel}>Marée</Text>
            </View>
            <Text style={styles.itemValue}>{tideHeight.toFixed(2)}m</Text>
          </View>
        )}

        {/* Température */}
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Ionicons name="thermometer" size={20} color={Colors.dark.primary} />
            <Text style={styles.itemLabel}>Eau</Text>
          </View>
          <Text style={styles.itemValue}>{formatTemperature(current.temperature)}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  item: {
    flex: 1,
    minWidth: '45%',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  itemLabel: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
    fontWeight: '600',
  },
  itemValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  itemSubtext: {
    fontSize: FontSize.xs,
    color: Colors.dark.muted,
    marginTop: Spacing.xs / 2,
  },
  windValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  windArrow: {
    fontSize: FontSize.xl,
  },
});
