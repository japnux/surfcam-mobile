/**
 * TideInfo component
 * Displays tide events (high/low tides)
 */

import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';
import type { TideEvent } from '@/lib/types';

interface TideInfoProps {
  events: TideEvent[];
}

export function TideInfo({ events }: TideInfoProps) {
  const nextEvents = events.slice(0, 4); // Show next 4 tide events

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water-outline" size={24} color={Colors.dark.primary} />
        <Text style={styles.title}>Marées</Text>
      </View>

      <View style={styles.events}>
        {nextEvents.map((event, index) => {
          const date = new Date(event.time);
          const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
          const dateStr = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
          const isHigh = event.type === 'high';

          return (
            <View key={event.time} style={styles.event}>
              <View style={styles.eventIcon}>
                <Ionicons
                  name={isHigh ? 'arrow-up' : 'arrow-down'}
                  size={20}
                  color={isHigh ? Colors.dark.primary : Colors.dark.warning}
                />
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventType}>
                  {isHigh ? 'Marée haute' : 'Marée basse'}
                </Text>
                <Text style={styles.eventTime}>{timeStr} - {dateStr}</Text>
              </View>
              <Text style={styles.eventHeight}>{event.height.toFixed(2)}m</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  events: {
    gap: Spacing.md,
  },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventType: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  eventTime: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
    marginTop: Spacing.xs / 2,
  },
  eventHeight: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.primary,
  },
});
