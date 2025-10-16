# 🚀 Quick Start - Surfcam Mobile

## ⚠️ Important

Cette application nécessite un **Development Build** car elle utilise des modules natifs (`expo-video`).
**Expo Go ne fonctionnera pas** pour cette application.

## 📱 Première Installation

### Option A : EAS Build (Recommandé - Plus simple)

```bash
# 1. Login à Expo
npx eas-cli login

# 2. Créer un build de développement
npx eas-cli build --profile development --platform ios

# 3. Attendre le build (5-10 minutes)
# 4. Télécharger et installer le fichier .tar.gz sur ton iPhone
# 5. Lancer le serveur
npm start
```

### Option B : Build Local (Plus rapide mais nécessite setup)

```bash
# 1. Installer les dépendances (une seule fois)
brew install cocoapods

# 2. Build et installer sur simulateur
npx expo run:ios

# 3. Ou sur iPhone physique (connecté en USB)
npx expo run:ios --device
```

## 🔄 Développement Quotidien

Une fois le development build installé :

```bash
# Terminal 1 : Backend Next.js
cd "/Users/geoffreyvidal/CascadeProjects/Surfcam v2"
npm run dev

# Terminal 2 : App Mobile
cd /Users/geoffreyvidal/CascadeProjects/surfcam-mobile
npm start
```

Ensuite :
1. Ouvre l'app **Surfcam** sur ton iPhone (pas Expo Go)
2. L'app se connecte automatiquement au serveur Metro
3. Les modifications se rechargent automatiquement (Fast Refresh)

## 🌐 Configuration Réseau

### Vérifier ton IP

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Mettre à jour .env

```bash
# Remplace par TON IP
EXPO_PUBLIC_API_URL=http://192.168.1.68:3000
```

### Vérifier que tout fonctionne

```bash
# Backend accessible ?
curl http://192.168.1.68:3000/api/spots

# Metro accessible ?
curl http://192.168.1.68:8081
```

## 🐛 Problèmes Courants

### "No development servers found"

**Cause** : Tu utilises Expo Go au lieu du Development Build

**Solution** : Installe le Development Build (voir ci-dessus)

### "Network request failed"

**Causes possibles** :
- Backend Next.js pas lancé
- IP incorrecte dans `.env`
- iPhone et Mac pas sur le même WiFi
- Firewall bloque la connexion

**Solutions** :
```bash
# 1. Vérifier que le backend tourne
lsof -i :3000

# 2. Vérifier l'IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# 3. Mettre à jour .env et relancer
npm start -- --clear
```

### "Cannot connect to Metro"

**Solution** :
```bash
# Nettoyer le cache et relancer
npm start -- --clear
```

## 📚 Documentation Complète

- `CONNECT_DATA.md` - Guide connexion aux données
- `SETUP_DEV_BUILD.md` - Guide setup development build
- `VIDEO_TESTING.md` - Guide test vidéos
- `BUILD_STATUS.md` - Status du build

## ✅ Checklist

Avant de commencer :
- [ ] Development Build installé sur iPhone
- [ ] Backend Next.js lancé (`npm run dev`)
- [ ] Serveur Metro lancé (`npm start`)
- [ ] iPhone et Mac sur le même WiFi
- [ ] IP correcte dans `.env`

## 🎯 Workflow Idéal

```bash
# 1. Build une fois (5-10 min)
npx eas-cli build --profile development --platform ios
# OU
npx expo run:ios

# 2. Développement quotidien (instant)
npm start

# 3. Rebuild seulement si :
# - Nouvelle dépendance native
# - Modification app.json
# - Changement config iOS
```

---

**Besoin d'aide ?** Consulte les autres fichiers de documentation ! 🚀
