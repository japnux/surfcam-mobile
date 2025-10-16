# 🚨 Fix Rapide - Erreur iOS 26.0

## Problème
Xcode cherche iOS 26.0 qui n'existe pas. Le simulateur utilise iOS 18.x.

## ✅ Solution 1 : Xcode (Rapide)

Xcode vient de s'ouvrir. Suis ces étapes :

1. **Dans Xcode, clique sur le projet "Surfcam"** (en haut à gauche)
2. **Sélectionne la target "Surfcam"**
3. **Onglet "General"**
4. **Trouve "Minimum Deployments"**
5. **Change de 26.0 à 15.0** (ou 16.0)
6. **Cmd+B** pour build
7. **Cmd+R** pour run

## ✅ Solution 2 : EAS Build (Recommandé)

Si Xcode ne fonctionne pas, utilise EAS Build (cloud) :

```bash
# 1. Login Expo (gratuit)
npx eas-cli login

# 2. Build de développement pour simulateur
npx eas-cli build --profile development --platform ios

# 3. Une fois terminé (15-20 min), télécharge le .tar.gz

# 4. Installe sur le simulateur
# Drag & drop le .app dans le simulateur

# 5. Lance le dev server
npx expo start --dev-client
```

## ✅ Solution 3 : Modifier app.json

Édite `app.json` :

```json
{
  "expo": {
    "ios": {
      "deploymentTarget": "15.0"
    }
  }
}
```

Puis relance :
```bash
rm -rf ios
npx expo prebuild --clean
npx expo run:ios
```

## 🎯 Recommandation

**Utilise EAS Build** - C'est le plus simple et ça marche toujours :

```bash
npx eas-cli login
npx eas-cli build --profile development --platform ios
```

Pendant le build (15-20 min), tu peux continuer à développer avec Expo Go. Une fois le build prêt, tu auras les vidéos qui fonctionnent !

## 📱 Après le Fix

Une fois que l'app est installée (via Xcode ou EAS) :

```bash
# Lance le dev server
npx expo start --dev-client

# Les vidéos webcam fonctionneront ! 🎥
```

---

**Besoin d'aide ?** Ouvre Xcode et change le Deployment Target à 15.0 !
