/**
 * Profile Screen
 * User profile and settings
 */

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';
import { useLocation } from '@/hooks/useLocation';
import { formatDistance } from '@/lib/utils/distance';

export default function ProfileScreen() {
  const { location } = useLocation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(!!location);

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert(
      'Notifications',
      notificationsEnabled
        ? 'Notifications désactivées'
        : 'Notifications activées pour les alertes de conditions'
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color={Colors.dark.primary} />
        </View>
        <Text style={styles.userName}>Surfeur</Text>
        <Text style={styles.userEmail}>surfeur@surfcam.app</Text>
      </View>

      {/* Location Info */}
      {location && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location" size={24} color={Colors.dark.primary} />
            <Text style={styles.sectionTitle}>Localisation</Text>
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              📍 {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
            </Text>
            <Text style={styles.locationSubtext}>
              Précision: {formatDistance(location.coords.accuracy ? location.coords.accuracy / 1000 : 0)}
            </Text>
          </View>
        </Card>
      )}

      {/* Settings */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="settings" size={24} color={Colors.dark.primary} />
          <Text style={styles.sectionTitle}>Paramètres</Text>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={20} color={Colors.dark.text} />
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: Colors.dark.border, true: Colors.dark.primary + '80' }}
            thumbColor={notificationsEnabled ? Colors.dark.primary : Colors.dark.muted}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="location" size={20} color={Colors.dark.text} />
            <Text style={styles.settingLabel}>Géolocalisation</Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: Colors.dark.border, true: Colors.dark.primary + '80' }}
            thumbColor={locationEnabled ? Colors.dark.primary : Colors.dark.muted}
          />
        </View>
      </Card>

      {/* App Info */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="information-circle" size={24} color={Colors.dark.primary} />
          <Text style={styles.sectionTitle}>À propos</Text>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>Version</Text>
          <Text style={styles.menuValue}>1.0.0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>Conditions d'utilisation</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.dark.muted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>Politique de confidentialité</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.dark.muted} />
        </TouchableOpacity>
      </Card>

      {/* Actions */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => Alert.alert('Déconnexion', 'Fonctionnalité à venir')}
      >
        <Ionicons name="log-out" size={20} color={Colors.dark.destructive} />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSize.md,
    color: Colors.dark.muted,
  },
  section: {
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  locationInfo: {
    gap: Spacing.xs,
  },
  locationText: {
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  locationSubtext: {
    fontSize: FontSize.sm,
    color: Colors.dark.muted,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingLabel: {
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  menuLabel: {
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  menuValue: {
    fontSize: FontSize.md,
    color: Colors.dark.muted,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.destructive + '40',
    marginTop: Spacing.lg,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.destructive,
  },
});
