# Configuration Production

## ✅ Configuration actuelle

L'application mobile pointe vers le serveur de production Vercel :

```
EXPO_PUBLIC_API_URL=https://surfcam-v2.vercel.app
```

## 🚀 Build Development sur iPhone

### Prérequis
- Development Build installé sur l'iPhone
- iPhone et Mac sur le même réseau WiFi (ou connexion via câble)

### Lancer l'app

1. **Démarrer le serveur Expo :**
   ```bash
   npm start
   ```

2. **Scanner le QR code** avec l'app Expo Go ou votre Development Build

3. **L'app se connectera automatiquement à Vercel** pour récupérer les données

## 🔄 Basculer entre Local et Production

### Pour utiliser le serveur local :
```bash
# Dans .env
EXPO_PUBLIC_API_URL=http://192.168.1.68:3000
```

### Pour utiliser Vercel (Production) :
```bash
# Dans .env
EXPO_PUBLIC_API_URL=https://surfcam-v2.vercel.app
```

**Important :** Après avoir modifié `.env`, redémarrez le serveur Expo :
```bash
npm start -- --clear
```

## 📝 Notes

- ✅ Pas besoin de lancer le serveur Next.js local
- ✅ Les données viennent directement de Vercel
- ✅ Cache API activé (5 minutes)
- ✅ Toutes les fonctionnalités disponibles (spots, prévisions, marées, favoris)

## 🗺️ Nouvelles fonctionnalités

### Carte interactive
- 2/3 de l'écran pour la carte
- 1/3 pour le flux vidéo en direct du spot sélectionné
- Zoom géolocalisation : 15km de rayon
- Affichage des distances pour les spots proches (<50km)

### Vidéo
- Mode `contain` : vidéo complète sans crop
- Contrôles natifs activés pour le plein écran
- Pas de timeout : lecture continue

### UI
- Favoris avec séparateurs (pas de superposition)
- Animations fluides
- Design cohérent et épuré
