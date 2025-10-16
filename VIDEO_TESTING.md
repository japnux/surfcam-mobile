# 🎬 Guide de Test des Vidéos Webcam

Les vidéos webcam nécessitent un **Development Build** car Expo Go ne supporte pas `expo-video`.

## 🚀 Option 1 : Build Local (Rapide)

### Prérequis
- Xcode installé
- Simulateur iOS ou iPhone physique

### Commandes
```bash
# Installer expo-dev-client (déjà fait)
npx expo install expo-dev-client

# Build et lancer sur simulateur iOS
npx expo run:ios

# Ou sur iPhone physique
npx expo run:ios --device
```

## ☁️ Option 2 : EAS Build (Cloud)

### Prérequis
- Compte Expo (gratuit)
- EAS CLI

### Commandes
```bash
# Login Expo
npx eas-cli login

# Build de développement pour simulateur
npx eas-cli build --profile development --platform ios

# Ou pour iPhone physique
npx eas-cli build --profile preview --platform ios
```

### Télécharger et installer
1. Le build sera disponible sur https://expo.dev
2. Télécharge le fichier `.tar.gz` (simulateur) ou `.ipa` (device)
3. Installe sur ton appareil
4. Lance avec `npx expo start --dev-client`

## 📱 Option 3 : TestFlight (Production-like)

Pour tester comme en production :

```bash
# Build production
npx eas-cli build --profile production --platform ios

# Submit à TestFlight
npx eas-cli submit --platform ios
```

## 🎥 Fonctionnalités Vidéo

Une fois le dev build installé, tu pourras :

- ✅ Voir les webcams en direct
- ✅ Vidéos HLS (m3u8)
- ✅ Vidéos YouTube
- ✅ Contrôles natifs
- ✅ Picture-in-Picture
- ✅ Fullscreen

## 🔧 Dépannage

### "xcodebuild exited with error code 70"
- Vérifie que Xcode est à jour
- Ouvre le projet dans Xcode : `open ios/Surfcam.xcodeproj`
- Build depuis Xcode pour voir l'erreur détaillée

### "iOS 26.0 is not installed"
- Ouvre Xcode > Settings > Platforms
- Télécharge iOS 18.0 ou supérieur

### Vidéo ne charge pas
- Vérifie que l'URL webcam est valide
- Teste l'URL dans un navigateur
- Regarde les logs : `npx expo start --dev-client`

## 📊 URLs de Test

Quelques spots avec webcams fonctionnelles :
- Anglet - Madrague : HLS stream
- Hossegor - La Centrale : YouTube embed
- Biarritz - Grande Plage : HLS stream

## 🎯 Prochaines Étapes

1. **Build local** : Le plus rapide pour tester
2. **EAS Build** : Si problèmes avec Xcode local
3. **TestFlight** : Pour tests beta avec utilisateurs

---

**Note** : Le composant `VideoPlayer` détecte automatiquement Expo Go et affiche un placeholder. En dev build, les vraies vidéos s'affichent !
