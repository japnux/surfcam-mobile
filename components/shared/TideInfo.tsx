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
  // Convertir les heures "0h29" en timestamps pour trier
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const sortedEvents = [...events]
    .map(event => {
      // Parser "0h29" -> heures et minutes
      const match = event.time.match(/(\d+)h(\d+)/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const eventDate = new Date(today);
        eventDate.setHours(hours, minutes, 0, 0);
        
        // Si l'heure est passée aujourd'hui, c'est pour demain
        if (eventDate < now) {
          eventDate.setDate(eventDate.getDate() + 1);
        }
        
        return { ...event, sortDate: eventDate };
      }
      return { ...event, sortDate: new Date(event.time) };
    })
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
    .slice(0, 4); // Prendre les 4 prochaines

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water-outline" size={24} color={Colors.dark.primary} />
        <Text style={styles.title}>Marées</Text>
      </View>

      <View style={styles.events}>
        {sortedEvents.map((event) => {
          // Gérer le format "0h29" ou date ISO
          let timeStr = event.time;
          let dateStr = '';
          
          // Si c'est une date ISO complète
          if (event.time.includes('T') || event.time.includes('-')) {
            const date = new Date(event.time);
            timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            dateStr = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
          } else if (event.sortDate) {
            // Utiliser la date calculée
            dateStr = event.sortDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
          }
          
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
                <Text style={styles.eventTime}>
                  {timeStr}{dateStr ? ` - ${dateStr}` : ''}
                </Text>
              </View>
              <Text style={styles.eventHeight}>
                {typeof event.height === 'number' ? `${event.height.toFixed(2)}m` : 'N/A'}
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
