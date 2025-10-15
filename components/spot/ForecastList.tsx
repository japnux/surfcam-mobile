/**
 * ForecastList component
 * Displays hourly forecast data in a scrollable list
 */

import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';
import { formatWaveHeight, formatWindSpeed, getWindDirectionArrow } from '@/lib/utils/format';
import type { HourlyForecast } from '@/lib/types';

interface ForecastListProps {
  hourly: HourlyForecast[];
  hoursToShow?: number;
}

export function ForecastList({ hourly, hoursToShow = 48 }: ForecastListProps) {
  const displayData = hourly.slice(0, hoursToShow);

  const renderItem = ({ item }: { item: HourlyForecast }) => {
    const date = new Date(item.time);
    const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const dateStr = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });

    return (
      <Card style={styles.forecastCard}>
        <View style={styles.forecastHeader}>
          <Text style={styles.forecastTime}>{timeStr}</Text>
          <Text style={styles.forecastDate}>{dateStr}</Text>
        </View>

        <View style={styles.forecastGrid}>
          {/* Vagues */}
          <View style={styles.forecastItem}>
            <Ionicons name="water" size={16} color={Colors.dark.muted} />
            <Text style={styles.forecastValue}>{formatWaveHeight(item.waveHeight)}</Text>
          </View>

          {/* Vent */}
          <View style={styles.forecastItem}>
            <Text style={styles.windArrow}>{getWindDirectionArrow(item.windDirection)}</Text>
            <Text style={styles.forecastValue}>{formatWindSpeed(item.windSpeed)}</Text>
          </View>

          {/* Période */}
          {item.wavePeriod && (
            <View style={styles.forecastItem}>
              <Ionicons name="timer-outline" size={16} color={Colors.dark.muted} />
              <Text style={styles.forecastValue}>{item.wavePeriod}s</Text>
            </View>
          )}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prévisions 48h</Text>
      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={(item) => item.time}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  forecastCard: {
    width: 120,
    padding: Spacing.sm,
  },
  forecastHeader: {
    marginBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    paddingBottom: Spacing.xs,
  },
  forecastTime: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  forecastDate: {
    fontSize: FontSize.xs,
    color: Colors.dark.muted,
    marginTop: Spacing.xs / 2,
  },
  forecastGrid: {
    gap: Spacing.xs,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  forecastValue: {
    fontSize: FontSize.sm,
    color: Colors.dark.text,
    fontWeight: '600',
  },
  windArrow: {
    fontSize: FontSize.md,
  },
});
