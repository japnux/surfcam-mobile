# 🔌 Connexion aux vraies données

## 📋 Prérequis

- Backend Next.js en cours d'exécution
- iPhone et Mac sur le même réseau WiFi
- Expo Go installé sur l'iPhone

---

## 🚀 Méthode 1 : Backend local (Développement)

### **Étape 1 : Trouver l'IP de ton Mac**

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Tu devrais voir quelque chose comme :
```
inet 192.168.1.68 netmask 0xffffff00 broadcast 192.168.1.255
```

Note l'adresse IP (ex: `192.168.1.68`)

### **Étape 2 : Mettre à jour .env**

Édite le fichier `.env` dans `surfcam-mobile/` :

```bash
# Remplace par TON IP
EXPO_PUBLIC_API_URL=http://192.168.1.68:3000
```

### **Étape 3 : Démarrer le backend**

```bash
cd "/Users/geoffreyvidal/CascadeProjects/Surfcam v2"
npm run dev
```

Le backend sera accessible sur `http://localhost:3000`

### **Étape 4 : Redémarrer l'app mobile**

```bash
cd /Users/geoffreyvidal/CascadeProjects/surfcam-mobile

# Arrêter le serveur actuel (Ctrl+C)
# Puis relancer
npm start -- --clear
```

### **Étape 5 : Tester**

1. Scanner le QR code avec Expo Go
2. L'app devrait maintenant charger les vraies données
3. Tu devrais voir la liste des spots

---

## 🌐 Méthode 2 : Backend en production (Recommandé)

Si le backend est déjà déployé sur Vercel/autre :

### **Étape 1 : Mettre à jour .env**

```bash
EXPO_PUBLIC_API_URL=https://surfcam.app
```

### **Étape 2 : Redémarrer l'app**

```bash
npm start -- --clear
```

---

## ✅ Vérification

### **Test 1 : API accessible**

Depuis ton navigateur sur le Mac :
```
http://192.168.1.68:3000/api/spots
```

Tu devrais voir la liste des spots en JSON.

### **Test 2 : CORS configuré**

Depuis le terminal :
```bash
curl -H "Origin: http://localhost" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  http://192.168.1.68:3000/api/spots -v
```

Tu devrais voir les headers CORS dans la réponse.

### **Test 3 : App mobile**

Dans l'app :
1. Écran Home devrait afficher les spots
2. Recherche devrait fonctionner
3. Clic sur un spot devrait afficher le détail
4. Prévisions et marées devraient se charger

---

## 🐛 Problèmes courants

### **"Network request failed"**

**Cause :** L'app ne peut pas joindre le backend

**Solutions :**
1. Vérifie que le backend tourne (`npm run dev`)
2. Vérifie que l'IP est correcte dans `.env`
3. Vérifie que iPhone et Mac sont sur le même WiFi
4. Désactive le VPN si activé
5. Vérifie le firewall Mac (Préférences Système → Sécurité)

### **"CORS error"**

**Cause :** Headers CORS manquants

**Solution :**
1. Vérifie que `next.config.js` a les headers CORS
2. Redémarre le backend Next.js
3. Clear cache : `rm -rf .next && npm run dev`

### **"Spot not found"**

**Cause :** L'API utilise des slugs, pas des IDs

**Solution :**
L'API client mobile doit utiliser le slug du spot, pas l'ID.

### **"Cannot connect to Metro"**

**Cause :** Cache Expo corrompu

**Solution :**
```bash
npm start -- --clear
# Ou
rm -rf node_modules/.cache
npm start
```

---

## 📊 Routes API disponibles

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/spots` | GET | Liste tous les spots |
| `/api/spots/[id]` | GET | Détail d'un spot |
| `/api/spots/[id]/forecast` | GET | Prévisions d'un spot |
| `/api/spots/[id]/tides` | GET | Marées d'un spot |
| `/api/search/spots?q=` | GET | Recherche de spots |

---

## 🔧 Configuration backend

### **CORS (next.config.js)**

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
      ],
    },
  ]
}
```

### **Routes API créées**

✅ `/app/api/spots/route.ts` - Liste spots  
✅ `/app/api/spots/[id]/route.ts` - Détail spot  
✅ `/app/api/spots/[id]/forecast/route.ts` - Prévisions  
✅ `/app/api/spots/[id]/tides/route.ts` - Marées  
✅ `/app/api/search/spots/route.ts` - Recherche (existait déjà)

---

## 🎯 Checklist de connexion

- [ ] Backend Next.js en cours d'exécution
- [ ] IP du Mac trouvée
- [ ] `.env` mis à jour avec l'IP
- [ ] CORS configuré dans `next.config.js`
- [ ] Routes API créées
- [ ] Backend redémarré
- [ ] App mobile redémarrée avec `--clear`
- [ ] iPhone et Mac sur le même WiFi
- [ ] Test API dans le navigateur OK
- [ ] App mobile charge les données

---

## 🚀 Commandes rapides

### **Démarrer tout**

Terminal 1 (Backend) :
```bash
cd "/Users/geoffreyvidal/CascadeProjects/Surfcam v2"
npm run dev
```

Terminal 2 (Mobile) :
```bash
cd /Users/geoffreyvidal/CascadeProjects/surfcam-mobile
npm start
```

### **Redémarrer proprement**

```bash
# Backend
cd "/Users/geoffreyvidal/CascadeProjects/Surfcam v2"
rm -rf .next
npm run dev

# Mobile
cd /Users/geoffreyvidal/CascadeProjects/surfcam-mobile
npm start -- --clear
```

---

## 📝 Notes

- Les données sont en cache (React Query) pendant 3-10 minutes
- Pull to refresh pour forcer le reload
- Les favoris sont stockés localement (AsyncStorage)
- Les vidéos nécessitent un Development Build (pas Expo Go)

---

## ✅ Prochaines étapes

Une fois les données connectées :
1. Tester tous les écrans
2. Vérifier les performances
3. Tester le mode offline (cache)
4. Créer un Development Build pour tester les vidéos
