/**
 * Profile Screen - Profil utilisateur
 * TODO: Implémenter les paramètres et préférences
 */

import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize } from '@/constants/Spacing';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={64} color={Colors.dark.muted} />
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.subtitle}>Paramètres et préférences</Text>
      <Text style={styles.subtitle}>À venir prochainement</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    padding: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.dark.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.dark.muted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
