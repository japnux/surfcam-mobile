# 📱 Surfcam Mobile - Application iOS

Application mobile native iOS pour Surfcam, développée avec React Native et Expo.

## 🚀 Quick Start

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm start

# Lancer sur iOS
npm run ios

# Lancer sur Android
npm run android

# Lancer sur Web
npm run web
```

## 📁 Structure du projet

```
surfcam-mobile/
├── app/                    # Navigation (Expo Router)
│   ├── (tabs)/            # Tabs navigation
│   │   ├── index.tsx      # Home - Liste des spots
│   │   ├── map.tsx        # Carte interactive
│   │   ├── favorites.tsx  # Spots favoris
│   │   └── profile.tsx    # Profil utilisateur
│   ├── spot/[id].tsx      # Détail d'un spot
│   └── _layout.tsx        # Layout principal
├── components/            # Composants React Native
│   ├── ui/               # Composants UI réutilisables
│   ├── spot/             # Composants liés aux spots
│   └── shared/           # Composants partagés
├── lib/                  # Logique métier
│   ├── api/             # Appels API
│   ├── utils/           # Utilitaires
│   └── types/           # Types TypeScript
├── hooks/               # Custom hooks
├── constants/           # Constantes (colors, spacing, etc.)
├── assets/             # Images, fonts, etc.
└── app.json            # Configuration Expo
```

## 🔧 Technologies

- **React Native** - Framework mobile
- **Expo** - Toolchain et SDK
- **Expo Router** - Navigation file-based
- **TypeScript** - Typage statique
- **React Query** - Gestion des données
- **Expo Video** - Lecture vidéo (webcams)
- **React Native Maps** - Carte interactive

## 🌐 API Backend

L'application consomme les mêmes APIs que le frontend web :
- **Open-Meteo** - Prévisions météo
- **Mareespeche.com** - Données de marées
- **Supabase** - Base de données

## 📦 Dépendances principales

```json
{
  "expo": "~51.0.0",
  "react-native": "0.74.0",
  "expo-router": "~3.5.0",
  "expo-video": "~1.2.0",
  "react-native-maps": "1.14.0",
  "@tanstack/react-query": "^5.0.0"
}
```

## 🏗️ Build & Deploy

### Development Build
```bash
eas build --profile development --platform ios
```

### Production Build
```bash
eas build --profile production --platform ios
```

### Submit to App Store
```bash
eas submit --platform ios
```

## 📝 Notes de développement

- Le code partagé avec le web est dans `../shared/`
- Les composants UI sont adaptés de Tailwind vers StyleSheet
- Les vidéos HLS sont gérées par `expo-video`
- Les favoris sont stockés localement avec AsyncStorage

## 🔗 Liens utiles

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
