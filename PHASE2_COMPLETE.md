# ✅ Phase 2 Complétée - Partage du code et API Client

**Date:** 15 octobre 2025  
**Durée:** ~30min  
**Status:** ✅ Terminé

---

## 🎯 Objectifs Phase 2

- [x] Copier et adapter les utilitaires du web
- [x] Créer l'API client mobile
- [x] Configurer React Query
- [x] Créer les hooks de base (useSpots, useForecast, useTides, useFavorites)
- [x] Intégrer React Query dans l'app

---

## 📦 Ce qui a été créé

### **1. Utilitaires partagés** ✅

**`lib/utils/format.ts`**
```typescript
✅ formatWaveHeight()
✅ formatWindSpeed()
✅ formatTemperature()
✅ formatPeriod()
✅ formatDirection()
✅ getWindDirectionArrow()
✅ formatSwellPower()
✅ getTidePhase()
✅ slugify()
```

**Adapté du web :**
- Suppression des dépendances web (clsx, twMerge)
- Fonctions pures réutilisables

### **2. API Client** ✅

**`lib/api/client.ts`**
```typescript
class APIClient {
  ✅ getSpots()           // Liste des spots
  ✅ getSpot(id)          // Détail d'un spot
  ✅ getForecast(spotId)  // Prévisions
  ✅ getTides(spotId)     // Marées
  ✅ searchSpots(query)   // Recherche
}
```

**Features :**
- Gestion d'erreur centralisée
- Headers automatiques
- Base URL configurable (dev/prod)

### **3. React Query** ✅

**`lib/api/query-client.ts`**
```typescript
{
  staleTime: 5min,        // Cache 5 minutes
  gcTime: 10min,          // Garde en mémoire 10min
  retry: 2,               // 2 tentatives
  refetchOnFocus: true    // Rafraîchit au retour
}
```

**Query Keys :**
```typescript
✅ queryKeys.spots
✅ queryKeys.spot(id)
✅ queryKeys.forecast(spotId)
✅ queryKeys.tides(spotId)
✅ queryKeys.search(query)
```

### **4. Custom Hooks** ✅

**`hooks/useSpots.ts`**
```typescript
✅ useSpots()              // Liste des spots
✅ useSpot(id)             // Détail d'un spot
✅ useSearchSpots(query)   // Recherche
```

**`hooks/useForecast.ts`**
```typescript
✅ useForecast(spotId)     // Prévisions (cache 3min)
```

**`hooks/useTides.ts`**
```typescript
✅ useTides(spotId)        // Marées (cache 10min)
```

**`hooks/useFavorites.ts`**
```typescript
✅ useFavorites()          // Gestion favoris
  - addFavorite(spotId)
  - removeFavorite(spotId)
  - toggleFavorite(spotId)
  - isFavorite(spotId)
```

**Stockage :**
- AsyncStorage pour persistance locale
- Pas besoin de backend

### **5. Intégration** ✅

**`app/_layout.tsx`**
```tsx
<QueryClientProvider client={queryClient}>
  <ThemeProvider>
    <Stack />
  </ThemeProvider>
</QueryClientProvider>
```

**Dépendances installées :**
- ✅ `@react-native-async-storage/async-storage`

---

## 🔄 Flux de données

```
Component
    ↓
Custom Hook (useSpots, useForecast, etc.)
    ↓
React Query (cache + fetch)
    ↓
API Client
    ↓
Backend API (Next.js)
    ↓
Cache (5-10min selon le type)
    ↓
Component (auto-update)
```

---

## 💾 Stratégie de cache

| Type de données | Durée cache | Raison |
|-----------------|-------------|--------|
| **Spots** | 5 min | Changent rarement |
| **Forecast** | 3 min | Données critiques, plus fréquent |
| **Tides** | 10 min | Changent lentement |
| **Search** | 5 min | Résultats stables |
| **Favorites** | ∞ | Local (AsyncStorage) |

---

## 📊 Métriques

| Métrique | Valeur |
|----------|--------|
| **Fichiers créés** | 8 nouveaux fichiers |
| **Lignes de code** | ~400 lignes |
| **Hooks créés** | 4 hooks |
| **API endpoints** | 5 endpoints |
| **Dépendances ajoutées** | 1 (AsyncStorage) |

---

## 🎨 Exemple d'utilisation

### **Afficher la liste des spots**
```typescript
import { useSpots } from '@/hooks/useSpots';

export function SpotsList() {
  const { data: spots, isLoading, error } = useSpots();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <FlatList
      data={spots}
      renderItem={({ item }) => <SpotCard spot={item} />}
    />
  );
}
```

### **Gérer les favoris**
```typescript
import { useFavorites } from '@/hooks/useFavorites';

export function SpotCard({ spot }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Card>
      <Text>{spot.name}</Text>
      <Button onPress={() => toggleFavorite(spot.id)}>
        {isFavorite(spot.id) ? '⭐' : '☆'}
      </Button>
    </Card>
  );
}
```

### **Afficher les prévisions**
```typescript
import { useForecast } from '@/hooks/useForecast';

export function SpotDetail({ spotId }) {
  const { data: forecast, isLoading } = useForecast(spotId);

  if (isLoading) return <Loading />;

  return (
    <View>
      {forecast.hourly.map(hour => (
        <ForecastRow key={hour.time} data={hour} />
      ))}
    </View>
  );
}
```

---

## ✅ Avantages

1. **Cache intelligent** - Moins de requêtes réseau
2. **Offline-first** - Données en cache disponibles hors ligne
3. **Auto-refresh** - Mise à jour automatique au retour de l'app
4. **Type-safe** - TypeScript sur toute la chaîne
5. **Réutilisable** - Hooks partagés entre écrans
6. **Performant** - Pas de re-fetch inutile

---

## 🔗 Code partagé avec le web

### **✅ Partagé**
- Types TypeScript (`Spot`, `ForecastData`, etc.)
- Utilitaires de formatage
- Logique métier (calculs, transformations)

### **❌ Spécifique mobile**
- API Client (fetch natif vs Next.js)
- Hooks React Query
- AsyncStorage (vs Supabase pour le web)

---

## 📋 Prochaines étapes (Phase 3)

### **À faire**
1. [ ] Créer l'écran Home (liste des spots)
2. [ ] Créer l'écran Map (carte interactive)
3. [ ] Créer l'écran Spot Detail
4. [ ] Créer l'écran Favorites
5. [ ] Créer les composants UI de base

### **Estimation**
- **Durée:** 3-4 jours
- **Complexité:** Moyenne-Haute

---

## 🎉 Résultat

**L'infrastructure de données est maintenant complète !**

- ✅ API Client fonctionnel
- ✅ React Query configuré
- ✅ Hooks prêts à l'emploi
- ✅ Cache optimisé
- ✅ Favoris persistants

**On peut maintenant créer les écrans et composants UI !** 🚀
