# 🚀 Guide de démarrage rapide - Olympique Poznan Backend

## 📦 Contenu du projet

### ✅ 9 Migrations SQL
- Users (utilisateurs/joueurs)
- Teams (équipes)
- Matches (matchs)
- News (actualités)
- Products (merchandising)
- Events (événements)
- Gallery (galerie photos)
- Partners (partenaires/sponsors)
- Statistics (statistiques joueurs)

### ✅ 9 Modèles Sequelize
Avec toutes les relations (belongsTo, hasMany) configurées

### ✅ 9 Services
Logique métier complète avec méthodes CRUD et méthodes spécifiques

### ✅ 8 Controllers
Gestion des requêtes HTTP avec messages de succès/erreur

### ✅ Schemas de validation Joi
Validation complète pour create, update et query

### ✅ Routes Express
API REST complète avec tous les endpoints

### ✅ Middleware
Validation automatique des données

## 🏁 Installation en 5 étapes

### 1. Installer
```bash
cd olympique-poznan-backend
npm install
```

### 2. Configurer la base de données
```bash
# Créer la base PostgreSQL
createdb olympique_poznan

# Ou via psql
psql -U postgres
CREATE DATABASE olympique_poznan;
\q
```

### 3. Configurer les variables d'environnement
```bash
cp .env.example .env
nano .env  # ou code .env
```

Modifier ces valeurs :
```env
DB_NAME=olympique_poznan
DB_USER=ton_user
DB_PASSWORD=ton_mot_de_passe
```

### 4. Lancer le serveur
```bash
# Mode développement (avec hot-reload)
npm run dev

# ou mode production
npm start
```

### 5. Tester l'API
Dans le navigateur : http://localhost:3000

Tu devrais voir le message de bienvenue avec la liste des endpoints !

## 📋 Checklist post-installation

- [ ] Base de données créée et accessible
- [ ] Variables `.env` configurées
- [ ] Dépendances installées (`npm install`)
- [ ] Serveur démarre sans erreur
- [ ] API répond sur http://localhost:3000
- [ ] Tables créées automatiquement (Sequelize sync)

## 🧪 Tester les endpoints

### Créer un utilisateur
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@example.com",
    "username": "jdupont",
    "password": "MotDePasse123!",
    "role": "player"
  }'
```

### Créer une équipe
```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Seniors",
    "namePl": "Seniorzy",
    "category": "senior",
    "season": "2024-2025"
  }'
```

### Récupérer tous les utilisateurs
```bash
curl http://localhost:3000/api/users
```

## 🎯 Prochaines étapes recommandées

### 1. Ajouter l'authentification JWT
- Protéger les routes admin

### 2. Upload d'images
- Intégrer Cloudinary (déjà dans .env.example)
- Ou utiliser Multer pour stockage local
- Créer un endpoint `/upload`

### 3. Seeders (données de test)
```javascript
// seeds/demo-data.js
export const seedUsers = async () => {
  await User.bulkCreate([
    { firstName: 'Admin', lastName: 'Test', ... },
    // ...
  ]);
};
```

### 4. Tests
```bash
npm install --save-dev jest supertest
# Créer des tests dans __tests__/
```

### 5. Documentation API
- Installer Swagger : `npm install swagger-ui-express`
- Créer la doc OpenAPI

## 🐛 Problèmes courants

### "Cannot connect to database"
→ Vérifie que PostgreSQL est démarré et que les credentials sont corrects dans `.env`

### "Port 3000 already in use"
→ Change le PORT dans `.env` ou arrête l'autre process

### "Module not found"
→ Vérifie que tu as bien fait `npm install`

### Erreur de migration
→ Les tables se créent automatiquement avec Sequelize sync en développement

## 📚 Structure des réponses API

### Succès
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "data": { ... }
}
```

### Liste avec pagination
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "total": 42,
      "page": 1,
      "limit": 20,
      "totalPages": 3
    }
  }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Utilisateur introuvable"
}
```

### Erreur de validation
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

## 🔑 Features importantes

### Multilingue (FR/PL)
Tous les modèles ont des champs `_pl` pour le polonais :
- `name` / `namePl`
- `title` / `titlePl`
- `description` / `descriptionPl`

### Pagination automatique
Tous les endpoints GET supportent `?page=1&limit=20`

### Filtres intelligents
- Users: `?role=player&teamId=1`
- Matches: `?status=finished&startDate=2024-01-01`
- News: `?status=published&category=match_report`

### Relations Sequelize
Les includes sont déjà configurés :
- User → Team
- Match → Team
- News → Author + Team
- etc.

## 💡 Conseils

1. **En développement** : Les tables se synchronisent automatiquement
2. **En production** : Utilise les migrations (`npm run migrate`)
3. **Sécurité** : N'oublie pas d'ajouter l'authentification JWT
4. **Performance** : Ajoute des index sur les champs fréquemment recherchés
5. **Logs** : Morgan est configuré pour logger toutes les requêtes HTTP

## 📞 Support

Si on rencontre des problèmes, on vérifie :
1. Les logs du serveur dans le terminal
2. La connexion à la base de données
3. Les variables d'environnement
4. Que toutes les dépendances sont installées

---

C'est parti pour le développement ! 🚀

**KAMIICODE**