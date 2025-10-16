# 🛠️ Setup Development Build - Guide Complet

## ⚠️ Prérequis Système

### 1. Installer Homebrew (si pas déjà installé)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Après installation, ajoute Homebrew au PATH :
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 2. Installer Ruby (version 3.1+)

```bash
# Installer rbenv pour gérer les versions Ruby
brew install rbenv ruby-build

# Installer Ruby 3.3
rbenv install 3.3.0
rbenv global 3.3.0

# Ajouter rbenv au PATH
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc

# Vérifier
ruby -v  # Doit afficher 3.3.0
```

### 3. Installer CocoaPods

```bash
# Avec Homebrew (recommandé)
brew install cocoapods

# OU avec gem (si Ruby 3.1+)
sudo gem install cocoapods

# Vérifier
pod --version
```

### 4. Installer Xcode Command Line Tools

```bash
xcode-select --install
```

## 🚀 Build du Projet

### Option A : Build pour Simulateur (Rapide)

```bash
# Nettoyer et rebuild
rm -rf ios node_modules
npm install

# Build et lancer
npx expo run:ios
```

### Option B : Build pour iPhone Physique

```bash
# Connecte ton iPhone via USB
# Active "Mode Développeur" dans Réglages > Confidentialité et sécurité

# Build et lancer
npx expo run:ios --device
```

### Option C : EAS Build (Cloud - Pas besoin de setup local)

```bash
# Login Expo
npx eas-cli login

# Build de développement
npx eas-cli build --profile development --platform ios

# Une fois le build terminé, télécharge et installe
# Puis lance avec :
npx expo start --dev-client
```

## 🔧 Résolution de Problèmes

### Erreur : "CocoaPods not found"
```bash
# Vérifier l'installation
which pod

# Si pas trouvé, réinstaller
brew install cocoapods
```

### Erreur : "Ruby version too old"
```bash
# Vérifier la version
ruby -v

# Si < 3.1, installer rbenv et Ruby 3.3
brew install rbenv
rbenv install 3.3.0
rbenv global 3.3.0
```

### Erreur : "xcodebuild failed"
```bash
# Ouvrir le projet dans Xcode pour voir l'erreur
open ios/Surfcam.xcworkspace

# Ou nettoyer et rebuild
cd ios
pod deintegrate
pod install
cd ..
npx expo run:ios
```

### Erreur : "No devices found"
```bash
# Lister les simulateurs disponibles
xcrun simctl list devices

# Lancer un simulateur
open -a Simulator

# Puis relancer le build
npx expo run:ios
```

## 📱 Après le Build

Une fois le dev build installé :

1. **Lance le serveur** :
   ```bash
   npx expo start --dev-client
   ```

2. **Ouvre l'app** sur ton appareil

3. **Les vidéos webcam fonctionneront** ! 🎥

## ⚡ Workflow Recommandé

Pour le développement quotidien :

```bash
# 1. Build une fois (prend 5-10 min)
npx expo run:ios

# 2. Ensuite, utilise juste le dev server (instant)
npx expo start --dev-client

# 3. L'app se met à jour automatiquement (Fast Refresh)
```

Tu n'as besoin de rebuild que si :
- Tu ajoutes une dépendance native
- Tu modifies `app.json` ou `eas.json`
- Tu changes la config native (iOS/Android)

## 🎯 Alternative : EAS Build (Recommandé si problèmes)

Si tu as des problèmes avec le setup local, utilise EAS Build :

**Avantages** :
- ✅ Pas besoin d'installer Ruby, CocoaPods, etc.
- ✅ Build dans le cloud
- ✅ Fonctionne sur n'importe quel Mac
- ✅ Gratuit pour les dev builds

**Commandes** :
```bash
# Setup (une fois)
npx eas-cli login
npx eas-cli build:configure

# Build
npx eas-cli build --profile development --platform ios

# Télécharge le .tar.gz et installe
# Puis lance :
npx expo start --dev-client
```

## 📚 Ressources

- [Expo Dev Client](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [CocoaPods](https://cocoapods.org/)
- [rbenv](https://github.com/rbenv/rbenv)

---

**Besoin d'aide ?** Ouvre une issue ou contacte l'équipe ! 🚀
