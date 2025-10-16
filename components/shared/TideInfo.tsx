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

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseHeight(height: TideEvent['height']): number | null {
  if (typeof height === 'number') return height;
  if (typeof height === 'string') {
    const value = parseFloat(height.replace(',', '.').replace(/[^\d.+-]/g, ''));
    return Number.isNaN(value) ? null : value;
  }
  return null;
}

function parseTimeString(baseDate: Date, time: string, offset: number): Date {
  const match = time.match(/(\d{1,2})h(\d{2})/);
  const date = new Date(baseDate.getTime() + offset * MS_PER_DAY);
  if (match) {
    date.setHours(parseInt(match[1], 10), parseInt(match[2], 10), 0, 0);
  }
  return date;
}

interface TideInfoProps {
  events: TideEvent[];
}

export function TideInfo({ events }: TideInfoProps) {
  // Convertir les heures "0h29" en timestamps pour trier
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let currentOffset = 0;
  let previousMinutes: number | null = null;

  const parsedEvents = events
    .map(event => {
      let sortDate: Date;
      const isIso = event.time.includes('T') || event.time.includes('-');

      if (isIso) {
        sortDate = new Date(event.time);
        const midnight = new Date(today);
        midnight.setTime(sortDate.getTime());
        midnight.setHours(0, 0, 0, 0);
        currentOffset = Math.round((midnight.getTime() - today.getTime()) / MS_PER_DAY);
      } else {
        const [_, hoursStr, minutesStr] = event.time.match(/(\d{1,2})h(\d{2})/) || [];
        if (minutesStr) {
          const totalMinutes = parseInt(hoursStr, 10) * 60 + parseInt(minutesStr, 10);
          if (previousMinutes !== null && totalMinutes < previousMinutes - 60) {
            currentOffset += 1;
          }
          previousMinutes = totalMinutes;
        }
        sortDate = parseTimeString(today, event.time, currentOffset);
        if (sortDate.getTime() < now.getTime() - MS_PER_DAY) {
          sortDate = parseTimeString(today, event.time, currentOffset + 1);
        }
      }

      const heightValue = parseHeight(event.height);

      return {
        ...event,
        sortDate,
        heightValue,
      };
    })
    .filter(event => !Number.isNaN(event.sortDate.getTime()))
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());

  const upcomingEvents = parsedEvents
    .filter(event => event.sortDate.getTime() >= now.getTime())
    .slice(0, 4);

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water-outline" size={24} color={Colors.dark.primary} />
        <Text style={styles.title}>Marées</Text>
      </View>

      <View style={styles.events}>
        {upcomingEvents.map((event, index) => {
          const isIso = event.time.includes('T') || event.time.includes('-');
          const displayDate = event.sortDate;
          const timeStr = isIso
            ? new Date(event.time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            : displayDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
          const dateStr = displayDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
          const isHigh = event.type === 'high';

          return (
            <View key={`tide-${index}-${event.time}-${event.type}`} style={styles.event}>
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
                <Text style={styles.eventTime}>
                  {timeStr}{dateStr ? ` - ${dateStr}` : ''}
                </Text>
              </View>
              <Text style={styles.eventHeight}>
                {event.heightValue !== null ? `${event.heightValue.toFixed(2)}m` : 'N/A'}
              </Text>
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
