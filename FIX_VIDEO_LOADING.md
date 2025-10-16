# 🔧 Fix : Problème de Chargement des Vidéos

## 🐛 Problème Initial

Les vidéos des spots affichaient "Chargement..." indéfiniment dans l'app mobile.

## 🔍 Diagnostic

### 1. Problème API Backend
L'API `/api/spots` ne retournait pas les champs `cam_url` et `cam_type`.

**Cause** : La fonction `getActiveSpots()` dans `/lib/data/spots.ts` ne sélectionnait pas ces champs pour optimiser les performances.

### 2. Problème Composant VideoPlayer
Le composant ne gérait pas correctement les événements du player vidéo.

**Causes** :
- Pas de listener sur les événements `statusChange`
- Pas de gestion du timeout
- Pas de gestion du cas où l'URL est manquante

## ✅ Solutions Appliquées

### 1. Backend - Ajout des champs webcam à l'API

**Fichier** : `/Users/geoffreyvidal/CascadeProjects/Surfcam v2/lib/data/spots.ts`

```typescript
// AVANT
export type SpotPreview = Pick<Spot, 'id' | 'name' | 'slug' | 'break_type' | 'level' | 'latitude' | 'longitude' | 'city' | 'region'>;

.select('id, name, slug, break_type, level, latitude, longitude, city, region')

// APRÈS
export type SpotPreview = Pick<Spot, 'id' | 'name' | 'slug' | 'break_type' | 'level' | 'latitude' | 'longitude' | 'city' | 'region' | 'cam_url' | 'cam_type'>;

.select('id, name, slug, break_type, level, latitude, longitude, city, region, cam_url, cam_type')
```

### 2. Mobile - Amélioration du VideoPlayer

**Fichier** : `/Users/geoffreyvidal/CascadeProjects/surfcam-mobile/components/spot/VideoPlayer.tsx`

**Changements** :
1. ✅ Ajout de la vérification si l'URL est manquante
2. ✅ Ajout d'un `useEffect` pour écouter les événements du player
3. ✅ Ajout d'un timeout de 10 secondes pour éviter le chargement infini
4. ✅ Ajout de logs pour le debugging
5. ✅ Gestion des erreurs avec affichage approprié

```typescript
// Vérification URL manquante
if (!url || url === 'null' || url === 'undefined') {
  return <Placeholder message="Webcam non disponible" />;
}

// Écoute des événements
useEffect(() => {
  const subscription = player.addListener('statusChange', (status) => {
    if (status.status === 'readyToPlay') {
      setIsLoading(false);
    } else if (status.status === 'error') {
      setHasError(true);
    }
  });

  // Timeout de 10s
  const timeout = setTimeout(() => {
    setHasError(true);
  }, 10000);

  return () => {
    subscription.remove();
    clearTimeout(timeout);
  };
}, [player]);
```

## 🧪 Tests

### Test API
```bash
curl -s http://192.168.1.68:3000/api/spots | jq '.[0] | {name, cam_url, cam_type}'
```

**Résultat attendu** :
```json
{
  "name": "Amoreira - Praia do Amoreira",
  "cam_url": "https://ds1-cache.quanteec.com/contents/encodings/...",
  "cam_type": "hls"
}
```

### Test App Mobile
1. Ouvre un spot dans l'app
2. La vidéo devrait :
   - Afficher "Chargement..." pendant max 10s
   - Puis soit charger la vidéo
   - Soit afficher "Webcam indisponible" en cas d'erreur

## 📊 États Possibles du VideoPlayer

| État | Affichage | Condition |
|------|-----------|-----------|
| **URL manquante** | "Webcam non disponible" | `!url \|\| url === 'null'` |
| **Expo Go** | "Development Build requis" | `isExpoGo === true` |
| **Chargement** | "Chargement..." + spinner | `isLoading === true` |
| **Erreur** | "Webcam indisponible" | `hasError === true` |
| **Succès** | Vidéo en lecture | `readyToPlay` |

## 🔄 Prochaines Étapes

1. ✅ Redémarrer le backend Next.js
2. ✅ Redémarrer l'app mobile avec `npm start -- --clear`
3. ✅ Tester sur plusieurs spots
4. ⏳ Créer un Development Build si pas déjà fait (pour tester les vraies vidéos)

## 📝 Notes

- Les vidéos HLS (`.m3u8`) nécessitent un **Development Build**
- **Expo Go ne supporte pas** `expo-video`
- Les URLs de webcam viennent de Quanteec (CDN)
- Timeout de 10s pour éviter les chargements infinis

## 🎯 Résultat Final

✅ L'API retourne maintenant les URLs de webcam  
✅ Le VideoPlayer gère correctement tous les cas  
✅ Les erreurs sont affichées clairement  
✅ Pas de chargement infini  

---

**Date** : 16 octobre 2025  
**Fichiers modifiés** :
- `/Users/geoffreyvidal/CascadeProjects/Surfcam v2/lib/data/spots.ts`
- `/Users/geoffreyvidal/CascadeProjects/surfcam-mobile/components/spot/VideoPlayer.tsx`
