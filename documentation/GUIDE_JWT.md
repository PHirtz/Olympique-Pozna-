# 🔐 Guide d'implémentation JWT - Olympique Poznan

## 📋 Vue d'ensemble

Ce guide explique comment activer et utiliser l'authentification JWT dans le backend.

## 🚀 Activation en 5 étapes

### Étape 1 : Installer les dépendances

```bash
npm install
# jsonwebtoken est déjà dans package.json
```

### Étape 2 : Configurer les secrets JWT

Dans ton fichier `.env`, ajoute :

```env
JWT_SECRET=ton_secret_super_securise_minimum_32_caracteres
JWT_REFRESH_SECRET=autre_secret_pour_refresh_token_32_chars
JWT_EXPIRES_IN=7d
```

⚠️ **IMPORTANT** : Changer les valeurs en production !

Génère des secrets sécurisés avec Node.js :
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Étape 3 : Activer JWT dans le controller User

Dans `/controllers/user.controller.js`, décommenter les lignes JWT :

**Avant :**
```javascript
// const token = generateToken(user);
// const refreshToken = generateRefreshToken(user);

res.status(200).json({
  success: true,
  message: 'Connexion réussie',
  data: {
    user: userWithoutPassword,
    // token,
    // refreshToken
  }
});
```

**Après :**
```javascript
import { generateToken, generateRefreshToken } from '../middleware/auth.middleware.js';

const token = generateToken(user);
const refreshToken = generateRefreshToken(user);

res.status(200).json({
  success: true,
  message: 'Connexion réussie',
  data: {
    user: userWithoutPassword,
    token,
    refreshToken
  }
});
```

### Étape 4 : Activer les routes protégées

Dans `/routes/index.routes.js`, décommenter et activer les routes protégées :

**Avant :**
```javascript
// Routes profil privé (nécessitent authentification JWT - à ajouter plus tard)
// userRouter.get('/me/profile', authMiddleware, userController.getProfile);
// userRouter.put('/me/profile', authMiddleware, userController.updateProfile);
```

**Après :**
```javascript
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';

// Routes profil privé (authentification requise)
userRouter.get('/me/profile', authMiddleware, userController.getProfile);
userRouter.put('/me/profile', authMiddleware, userController.updateProfile);
userRouter.put('/me/password', authMiddleware, userController.updatePassword);
userRouter.put('/me/picture', authMiddleware, userController.updateProfilePicture);

// Routes admin
userRouter.post('/', authMiddleware, requireRole('admin'), validate(userCreateSchema), userController.create);
userRouter.delete('/:id', authMiddleware, requireRole('admin'), userController.delete);
```

### Étape 5 : Tester l'authentification

1. **Se connecter** :
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jdupont",
    "password": "MotDePasse123!"
  }'
```

Réponse :
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

2. **Utiliser le token** :
```bash
curl -X GET http://localhost:3000/api/users/me/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📚 Utilisation des middlewares

### authMiddleware

Vérifie que l'utilisateur est authentifié. Ajoute `req.userId`, `req.userRole` et `req.userEmail`.

```javascript
router.get('/me/profile', authMiddleware, userController.getProfile);
```

### requireRole

Vérifie que l'utilisateur a l'un des rôles autorisés. À utiliser **après** `authMiddleware`.

```javascript
// Un seul rôle
router.post('/teams', authMiddleware, requireRole('admin'), teamController.create);

// Plusieurs rôles
router.put('/matches/:id', authMiddleware, requireRole('admin', 'coach'), matchController.update);
```

### requireOwnership

Vérifie que l'utilisateur est le propriétaire de la ressource OU est admin.

```javascript
router.put('/users/:id/profile', authMiddleware, requireOwnership(), userController.update);
```

### optionalAuth

Authentifie si un token est présent, sinon continue normalement. Utile pour des routes publiques avec comportement optionnel.

```javascript
router.get('/news', optionalAuth, newsController.getAll);
// Si authentifié: peut voir les brouillons
// Si non authentifié: voit seulement les articles publiés
```

## 🎯 Structure complète du token JWT

### Access Token (courte durée - 7 jours par défaut)

```json
{
  "userId": 1,
  "role": "player",
  "email": "jean.dupont@example.com",
  "username": "jdupont",
  "iat": 1699000000,
  "exp": 1699604800
}
```

### Refresh Token (longue durée - 30 jours)

```json
{
  "userId": 1,
  "type": "refresh",
  "iat": 1699000000,
  "exp": 1701592800
}
```

## 🔄 Implémentation du refresh token

Si on veut permettre le renouvellement automatique des tokens :

### 1. Créer un endpoint de refresh

```javascript
// Dans userController.js
import { generateToken } from '../middleware/auth.middleware.js';
import jwt from 'jsonwebtoken';

async refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new HttpBadRequestError('Refresh token manquant');
    }

    // Vérifier le refresh token
    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    if (decoded.type !== 'refresh') {
      throw new HttpBadRequestError('Token invalide');
    }

    // Récupérer l'utilisateur
    const user = await userService.getUserById(decoded.userId);
    
    // Générer un nouveau access token
    const newToken = generateToken(user);

    res.status(200).json({
      success: true,
      data: { token: newToken }
    });
  } catch (error) {
    next(error);
  }
}
```

### 2. Ajouter la route

```javascript
router.post('/refresh-token', userController.refreshToken);
```

### 3. Utilisation côté frontend

```javascript
// Quand l'access token expire (401)
async function refreshAccessToken(refreshToken) {
  const response = await fetch('http://localhost:3000/api/users/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });

  const data = await response.json();
  return data.data.token; // Nouveau access token
}
```

## 🛡️ Bonnes pratiques de sécurité

### 1. Stockage des tokens côté frontend

**✅ Recommandé** : httpOnly Cookie (le plus sécurisé)
```javascript
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
});
```

**⚠️ Alternative** : localStorage (attention XSS)
```javascript
localStorage.setItem('token', token);
```

### 2. Durée de vie des tokens

- **Access token** : Court (7 jours max)
- **Refresh token** : Long (30 jours)
- Forcer la reconnexion régulière pour les actions sensibles

### 3. Rotation des secrets

Change tes secrets JWT régulièrement en production :
- Tous les 6 mois minimum
- Immédiatement en cas de fuite

### 4. HTTPS obligatoire en production

```javascript
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});
```

## 📊 Exemples complets

### Connexion et utilisation du token

```javascript
// 1. Connexion
const loginResponse = await fetch('http://localhost:3000/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'jdupont',
    password: 'MotDePasse123!'
  })
});

const { data } = await loginResponse.json();
const { token, user } = data;

// 2. Stocker le token
localStorage.setItem('token', token);

// 3. Utiliser le token pour les requêtes protégées
const profileResponse = await fetch('http://localhost:3000/api/users/me/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const profile = await profileResponse.json();
```

### Modifier son profil

```javascript
const updateResponse = await fetch('http://localhost:3000/api/users/me/profile', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({
    bio: 'Passionné de football',
    phoneNumber: '+33612345678'
  })
});
```

### Gérer l'expiration du token

```javascript
async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem('token');
  
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  let response = await fetch(url, options);

  // Si le token a expiré
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    
    // Tenter de rafraîchir le token
    const newToken = await refreshAccessToken(refreshToken);
    localStorage.setItem('token', newToken);
    
    // Réessayer la requête avec le nouveau token
    options.headers.Authorization = `Bearer ${newToken}`;
    response = await fetch(url, options);
  }

  return response;
}
```

## 🔧 Débogage

### Erreurs courantes

**"Token invalide"**
- Vérifie que JWT_SECRET est le même entre génération et vérification
- Vérifie le format du header : `Authorization: Bearer <token>`

**"Token expiré"**
- Utilise le refresh token pour obtenir un nouveau token
- Augmente JWT_EXPIRES_IN si nécessaire

**"Authentification requise"**
- Vérifie que le token est bien envoyé dans le header
- Vérifie que le middleware authMiddleware est bien appliqué

### Décoder un token JWT (debug)

```javascript
import jwt from 'jsonwebtoken';

const decoded = jwt.decode(token, { complete: true });
console.log(decoded);
```

Ou utilise le site [jwt.io](https://jwt.io) pour décoder visuellement.

## ✅ Checklist d'activation

- [ ] Secrets JWT configurés dans `.env`
- [ ] Import de `generateToken` dans `user.controller.js`
- [ ] Lignes JWT décommentées dans la méthode `login`
- [ ] Import de `authMiddleware` dans `routes/index.routes.js`
- [ ] Routes protégées activées avec `authMiddleware`
- [ ] Test de connexion (récupération du token)
- [ ] Test d'une route protégée avec le token
- [ ] Test de refus d'accès sans token (401)
- [ ] Test de refus d'accès avec mauvais rôle (403)

## 🎉 Résultat

Un système d'authentification JWT complet et sécurisé pour Olympique Poznan ! 🚀

---

Développé par **KAMIICODE**