# 🧪 Guide de test - Surfcam Mobile

## 🚀 Option 1 : Expo Go (Recommandé pour démarrer)

### **Installation**

1. **Installer Expo Go sur ton iPhone**
   - App Store : https://apps.apple.com/app/expo-go/id982107779
   - Ou cherche "Expo Go" dans l'App Store

2. **Lancer le serveur de développement**
   ```bash
   cd /Users/geoffreyvidal/CascadeProjects/surfcam-mobile
   npm start
   ```

3. **Scanner le QR code**
   - Ouvre l'appareil photo de ton iPhone
   - Scanne le QR code affiché dans le terminal
   - L'app s'ouvrira dans Expo Go

### **⚠️ Limitations Expo Go**
- ❌ Certains plugins natifs ne fonctionnent pas (expo-video, expo-location)
- ❌ Pas de notifications push
- ✅ Parfait pour tester l'UI et la navigation
- ✅ Hot reload en temps réel

---

## 📱 Option 2 : Development Build (Recommandé pour test complet)

Pour tester toutes les fonctionnalités (vidéo, localisation, etc.)

### **Prérequis**
- Compte Expo (gratuit)
- iPhone connecté en USB OU TestFlight

### **1. Créer un compte Expo**
```bash
npx eas login
```

### **2. Configurer le projet**
```bash
npx eas build:configure
```

### **3. Créer un Development Build**

**Pour simulateur iOS (Mac uniquement) :**
```bash
npx eas build --profile development --platform ios --local
```

**Pour iPhone physique (via TestFlight) :**
```bash
npx eas build --profile development --platform ios
```

Cela prendra ~15-20 minutes.

### **4. Installer le build**

**Simulateur :**
```bash
# Le build sera dans le dossier local
# Double-cliquer sur le fichier .app pour l'installer
```

**iPhone physique :**
- Tu recevras un lien TestFlight par email
- Installer TestFlight depuis l'App Store
- Cliquer sur le lien pour installer l'app

### **5. Lancer l'app**
```bash
npm start
# Puis appuyer sur 'i' pour iOS
```

---

## 💻 Option 3 : Simulateur iOS (Mac uniquement)

### **Prérequis**
- macOS
- Xcode installé

### **Installation Xcode**
```bash
# Installer Xcode depuis l'App Store
# Puis installer les command line tools
xcode-select --install
```

### **Lancer le simulateur**
```bash
cd /Users/geoffreyvidal/CascadeProjects/surfcam-mobile
npm run ios
```

Cela ouvrira automatiquement le simulateur iOS.

---

## 🌐 Option 4 : Web (Limité)

Pour tester rapidement l'UI sans iPhone.

```bash
npm run web
```

Ouvre http://localhost:8081 dans ton navigateur.

**⚠️ Limitations :**
- Pas de navigation native
- Pas de composants natifs (Camera, etc.)
- Utile uniquement pour l'UI

---

## 🔧 Commandes utiles

### **Démarrer le serveur**
```bash
npm start
```

### **Options du serveur**
- `i` - Ouvrir sur iOS Simulator
- `a` - Ouvrir sur Android Emulator
- `w` - Ouvrir sur Web
- `r` - Reload l'app
- `m` - Toggle menu
- `c` - Clear cache

### **Logs**
```bash
# Voir les logs en temps réel
npx expo start --dev-client
```

---

## 🐛 Problèmes courants

### **"Cannot connect to Metro"**
```bash
# Nettoyer le cache
npm start -- --clear

# Ou
rm -rf node_modules/.cache
npm start
```

### **"Module not found"**
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### **"Expo Go ne se connecte pas"**
- Vérifie que ton iPhone et ton Mac sont sur le même WiFi
- Désactive le VPN si activé
- Redémarre Expo Go

---

## ✅ Checklist de test

### **Navigation**
- [ ] Home screen s'affiche
- [ ] Tabs fonctionnent (Home, Map, Favorites, Profile)
- [ ] Recherche fonctionne
- [ ] Clic sur SpotCard navigue vers détail (TODO)

### **Favoris**
- [ ] Clic sur étoile ajoute/retire des favoris
- [ ] Favoris persistent après reload
- [ ] Écran Favorites affiche les bons spots

### **UI**
- [ ] Couleurs cohérentes (dark theme)
- [ ] Espacements corrects
- [ ] Icônes s'affichent
- [ ] Loading states fonctionnent

### **Performance**
- [ ] Scroll fluide (60fps)
- [ ] Pas de lag lors de la recherche
- [ ] Hot reload fonctionne

---

## 📊 Méthode recommandée par phase

| Phase | Méthode | Raison |
|-------|---------|--------|
| **Phase 1-3** | Expo Go | Rapide, pas besoin de build |
| **Phase 4** | Development Build | Vidéo nécessite build natif |
| **Phase 5+** | Development Build | Features natives |
| **Production** | Production Build | App Store |

---

## 🎯 Pour tester maintenant (Phase 3)

**Recommandation : Expo Go**

1. Installe Expo Go sur ton iPhone
2. Lance `npm start` dans le terminal
3. Scanne le QR code
4. Teste la navigation et les favoris

**Limitations actuelles :**
- ❌ Pas de données réelles (API backend pas accessible)
- ❌ Vidéos ne fonctionneront pas (expo-video nécessite build)
- ✅ UI et navigation fonctionnent
- ✅ Favoris fonctionnent (AsyncStorage)

---

## 🔗 Ressources

- [Expo Go](https://expo.dev/client)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Debugging](https://docs.expo.dev/debugging/runtime-issues/)
