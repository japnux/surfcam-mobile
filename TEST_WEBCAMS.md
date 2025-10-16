# 🧪 Test des Webcams - Guide Complet

## ✅ État Actuel

- ✅ Backend retourne les URLs de webcam (`cam_url` et `cam_type`)
- ✅ URLs au format HLS : `https://ds1-cache.quanteec.com/.../media_0.m3u8`
- ✅ URLs accessibles (HTTP 200)
- ✅ Composant VideoPlayer amélioré avec gestion d'erreurs

## 🔄 Redémarrer l'App

Pour que les changements prennent effet :

```bash
# Dans le terminal de l'app mobile
# Appuie sur 'r' pour reload
# OU redémarre complètement :
npm start -- --clear
```

## 📱 Comportement Attendu

### Si tu utilises **Expo Go**
❌ Les vidéos HLS ne fonctionneront pas  
✅ Tu verras : "Les vidéos nécessitent un Development Build"

**Solution** : Créer un Development Build (voir ci-dessous)

### Si tu utilises un **Development Build**
✅ Les vidéos devraient se charger
✅ Affichage "Chargement..." pendant 1-3 secondes
✅ Puis lecture automatique de la vidéo en boucle

## 🎥 Format des URLs

```
https://ds1-cache.quanteec.com/contents/encodings/live/
  [UUID]/media_0.m3u8
```

- **Type** : HLS (HTTP Live Streaming)
- **Format** : `.m3u8` (playlist)
- **CDN** : Quanteec
- **Lecture** : Native via `expo-video`

## 🐛 Dépannage

### "Chargement..." infini

**Causes possibles** :
1. Tu utilises Expo Go (pas supporté)
2. Problème réseau
3. URL invalide

**Solutions** :
```bash
# 1. Vérifier que tu n'es pas sur Expo Go
# Regarde le nom de l'app : doit être "Surfcam", pas "Expo Go"

# 2. Tester l'URL manuellement
curl -I "https://ds1-cache.quanteec.com/contents/encodings/live/aa388b73-3f23-487e-3636-3530-6d61-63-96a0-4228d6fe2505d/media_0.m3u8"

# 3. Vérifier les logs
# Dans le terminal Metro, tu devrais voir :
# "VideoPlayer - URL: https://..."
# "Video status: loading"
# "Video status: readyToPlay"
```

### "Webcam indisponible"

**Causes possibles** :
1. Timeout après 10 secondes
2. Erreur de lecture du flux
3. URL expirée ou invalide

**Solutions** :
1. Vérifier la connexion internet
2. Tester l'URL dans un navigateur
3. Vérifier les logs d'erreur dans la console

### "Webcam non disponible"

**Cause** : `cam_url` est `null` dans la base de données

**Solution** : Vérifier que l'API retourne bien les URLs :
```bash
curl http://192.168.1.68:3000/api/spots | jq '.[0] | {name, cam_url}'
```

## 🏗️ Créer un Development Build

### Option 1 : EAS Build (Recommandé)

```bash
# Login
npx eas-cli login

# Build iOS
npx eas-cli build --profile development --platform ios

# Attendre 5-10 minutes
# Télécharger et installer le .tar.gz sur ton iPhone
# Puis lancer :
npm start
```

### Option 2 : Build Local

```bash
# Installer CocoaPods (si pas déjà fait)
brew install cocoapods

# Build
npx expo run:ios --device

# Attendre 5-10 minutes (première fois)
```

## 📊 Checklist de Test

### Backend
- [ ] Backend Next.js lancé (`npm run dev`)
- [ ] API accessible : `curl http://192.168.1.68:3000/api/spots`
- [ ] URLs de webcam retournées : `jq '.[0].cam_url'`

### Mobile
- [ ] Serveur Metro lancé (`npm start`)
- [ ] Development Build installé (pas Expo Go)
- [ ] App connectée au serveur Metro
- [ ] iPhone et Mac sur le même WiFi

### Test Vidéo
- [ ] Ouvrir un spot dans l'app
- [ ] Voir "Chargement..." pendant quelques secondes
- [ ] Vidéo se charge et joue automatiquement
- [ ] Badge "EN DIRECT" visible
- [ ] Vidéo en boucle

## 🎯 Exemple de Test

1. **Ouvre l'app Surfcam** (pas Expo Go)
2. **Cherche "Amoreira"** dans la liste
3. **Clique sur le spot**
4. **Observe la vidéo** :
   - ⏳ "Chargement..." (1-3s)
   - ✅ Vidéo de la plage en direct
   - 🔴 Badge "EN DIRECT" en haut à gauche
   - 🔄 Lecture en boucle

## 📝 Logs Utiles

Dans le terminal Metro, tu devrais voir :

```
VideoPlayer - URL: https://ds1-cache.quanteec.com/... Type: hls
Video status: loading
Video status: readyToPlay
```

En cas d'erreur :

```
VideoPlayer - URL: https://ds1-cache.quanteec.com/... Type: hls
Video status: loading
Video status: error
Video error: [détails de l'erreur]
```

## 🚀 Prochaines Étapes

Une fois les vidéos fonctionnelles :
1. Tester sur plusieurs spots
2. Vérifier les performances
3. Tester le mode plein écran
4. Tester le Picture-in-Picture

---

**Note** : Les vidéos HLS nécessitent un Development Build. Expo Go ne supporte pas `expo-video`.
