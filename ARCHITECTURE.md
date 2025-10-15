# 🏗️ Architecture - Surfcam Mobile

## 📁 Structure du projet

```
surfcam-mobile/
├── app/                          # Expo Router - Navigation
│   ├── (tabs)/                   # Tab navigation
│   │   ├── _layout.tsx          # Layout des tabs
│   │   ├── index.tsx            # 🏠 Home - Liste des spots
│   │   ├── map.tsx              # 🗺️ Carte interactive
│   │   ├── favorites.tsx        # ⭐ Spots favoris
│   │   └── profile.tsx          # 👤 Profil utilisateur
│   ├── spot/                    # Routes spot
│   │   └── [id].tsx            # 📍 Détail d'un spot
│   ├── _layout.tsx             # Layout racine
│   └── +not-found.tsx          # 404
│
├── components/                   # Composants React Native
│   ├── ui/                      # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Loading.tsx
│   ├── spot/                    # Composants liés aux spots
│   │   ├── SpotCard.tsx        # Card spot dans la liste
│   │   ├── SpotHeader.tsx      # Header détail spot
│   │   ├── VideoPlayer.tsx     # Lecteur webcam
│   │   └── ForecastList.tsx    # Liste des prévisions
│   └── shared/                  # Composants partagés
│       ├── ConditionsBanner.tsx # Conditions actuelles
│       ├── TideChart.tsx       # Graphique marées
│       └── WeatherIcon.tsx     # Icônes météo
│
├── lib/                         # Logique métier
│   ├── api/                     # Appels API
│   │   ├── config.ts           # Configuration API
│   │   ├── spots.ts            # API spots
│   │   ├── forecast.ts         # API prévisions
│   │   └── tides.ts            # API marées
│   ├── utils/                   # Utilitaires
│   │   ├── format.ts           # Formatage données
│   │   ├── distance.ts         # Calcul distances
│   │   └── date.ts             # Manipulation dates
│   └── types/                   # Types TypeScript
│       └── index.ts            # Types partagés
│
├── hooks/                       # Custom hooks
│   ├── useSpots.ts             # Hook spots
│   ├── useForecast.ts          # Hook prévisions
│   ├── useTides.ts             # Hook marées
│   ├── useLocation.ts          # Hook géolocalisation
│   └── useFavorites.ts         # Hook favoris
│
├── constants/                   # Constantes
│   ├── Colors.ts               # Palette de couleurs
│   └── Spacing.ts              # Espacements & tailles
│
├── assets/                      # Assets statiques
│   ├── images/                 # Images
│   └── fonts/                  # Fonts custom
│
├── app.json                     # Configuration Expo
├── eas.json                     # Configuration EAS Build
├── package.json                 # Dépendances
├── tsconfig.json               # Configuration TypeScript
└── README.md                    # Documentation
```

## 🔄 Flux de données

### 1. **Récupération des données**

```
User Action
    ↓
React Query Hook (useSpots, useForecast, etc.)
    ↓
API Client (lib/api/*)
    ↓
Backend API (Next.js) ou API externe (Open-Meteo, Mareespeche)
    ↓
Cache (React Query)
    ↓
Component
```

### 2. **Navigation**

```
Tab Navigation (Bottom Tabs)
    ├── Home (Liste spots)
    ├── Map (Carte)
    ├── Favorites (Favoris)
    └── Profile (Profil)

Stack Navigation
    └── Spot Detail (Modal)
```

### 3. **État local**

- **AsyncStorage** : Favoris, préférences utilisateur
- **React Query** : Cache des données API
- **React State** : État UI temporaire

## 🎨 Design System

### Couleurs (Dark Theme)
```typescript
{
  background: '#0f172a',  // Slate 900
  card: '#1e293b',        // Slate 800
  text: '#f8fafc',        // Slate 50
  primary: '#0ea5e9',     // Sky 500
  muted: '#64748b',       // Slate 500
}
```

### Espacements
```typescript
{
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}
```

## 📦 Dépendances principales

### Core
- **expo** : Framework
- **react-native** : UI Framework
- **expo-router** : Navigation

### Features
- **expo-video** : Lecture vidéo (webcams)
- **react-native-maps** : Carte interactive
- **expo-location** : Géolocalisation
- **@tanstack/react-query** : Gestion données

### Utils
- **expo-constants** : Constantes environnement
- **@expo/vector-icons** : Icônes

## 🔐 Sécurité

- Variables d'environnement via `.env`
- Clés API stockées côté backend
- Pas de secrets dans le code

## 🚀 Performance

### Optimisations
1. **Lazy loading** : Composants chargés à la demande
2. **Image caching** : expo-image avec cache
3. **Data caching** : React Query (5min cache)
4. **List virtualization** : FlatList pour grandes listes
5. **Code splitting** : Expo Router automatique

### Métriques cibles
- **Time to Interactive** : < 3s
- **Bundle size** : < 5MB
- **FPS** : 60fps constant

## 🧪 Tests

### Structure
```
__tests__/
├── components/
├── hooks/
└── lib/
```

### Types de tests
- **Unit tests** : Jest
- **Component tests** : React Native Testing Library
- **E2E tests** : Detox (optionnel)

## 📱 Builds

### Development
```bash
eas build --profile development --platform ios
```

### Production
```bash
eas build --profile production --platform ios
```

## 🔄 CI/CD

### GitHub Actions (à configurer)
```yaml
- Lint & Type check
- Tests unitaires
- Build preview (sur PR)
- Build production (sur main)
- Submit to App Store (sur tag)
```

## 📝 Conventions

### Naming
- **Components** : PascalCase (`SpotCard.tsx`)
- **Hooks** : camelCase avec `use` (`useSpots.ts`)
- **Utils** : camelCase (`formatDate.ts`)
- **Constants** : UPPER_SNAKE_CASE

### Imports
```typescript
// 1. External
import { View } from 'react-native'

// 2. Internal
import { SpotCard } from '@/components/spot/SpotCard'

// 3. Types
import type { Spot } from '@/lib/types'
```

## 🔗 Liens avec le web

### Code partagé
- Types TypeScript
- Logique API (adaptée)
- Utilitaires de formatage
- Constantes métier

### Code spécifique mobile
- Composants UI (React Native vs React)
- Navigation (Expo Router vs Next.js)
- Features natives (géoloc, notifs, etc.)
