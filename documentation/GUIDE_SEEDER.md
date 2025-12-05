# 🌱 Guide des Seeders - Olympique Poznan Backend

## 📚 Qu'est-ce qu'un seeder ?

Un **seeder** est un script qui remplit automatiquement ta base de données avec des données de test réalistes. C'est super pratique pour :
- Développer le frontend sans avoir une base vide
- Tester l'API avec des vraies données
- Présenter un projet
- Éviter de créer manuellement des dizaines d'entrées

---

## 🚀 Utilisation

### Lancer tous les seeders

```bash
npm run seed
```

C'est tout ! 🎉

---

## 📊 Données créées

### 1. **Users** (5 utilisateurs)
- **admin** : Administrateur du système
  - Email : admin@olympiquepoznan.com
  - Mot de passe : Password123!
  
- **coach_pierre** : Entraîneur principal
  - Email : pierre.kowalski@olympiquepoznan.com
  - Mot de passe : Password123!
  
- **player_lucas** : Joueur attaquant #10
  - Email : lucas.nowak@olympiquepoznan.com
  - Mot de passe : Password123!
  
- **player_adam** : Joueur milieu #7
  - Email : adam.wisniewski@olympiquepoznan.com
  - Mot de passe : Password123!
  
- **member_marie** : Membre supporter
  - Email : marie.dubois@olympiquepoznan.com
  - Mot de passe : Password123!

### 2. **Teams** (5 équipes)
- Olympique Poznan Seniors
- Olympique Poznan U19
- Olympique Poznan U17
- Olympique Poznan U15
- Olympique Poznan U13

### 3. **Matches** (8 matchs)
- 3 matchs passés (Seniors) avec scores
- 3 matchs à venir (Seniors)
- 2 matchs à venir (U19)

### 4. **News** (5 actualités)
- Rapport de match : Victoire 3-1
- Annonce : Inscriptions stage été 2025
- Rapport de match : Match nul 2-2
- Annonce : Nouveau partenariat
- Événement : Calendrier décembre

### 5. **Camps** (5 stages)
- Stage d'été 2025 - Zakopane (ouvert, 12/30 inscrits)
- Stage de Noël 2024 - Poznań (ouvert, 28/40 inscrits)
- Stage de Pâques 2025 - Gdańsk (ouvert, 8/25 inscrits)
- Stage Élite - Perfectionnement (ouvert, 5/20 inscrits)
- Stage Automne 2024 - Poznań (COMPLET - 35/35)

### 6. **Products** (15 produits)
- Maillots domicile et extérieur
- Shorts, chaussettes
- Vêtements d'entraînement
- Accessoires (écharpe, bonnet, casquette)
- Équipements (ballon, protège-tibias)
- Goodies

### 7. **Partners** (10 partenaires)
- 2 sponsors principaux
- 3 partenaires officiels
- 2 fournisseurs
- 3 partenaires média

---

## 🎯 Ordre d'exécution

Les seeders s'exécutent dans cet ordre (important pour les clés étrangères) :

1. **Users** (utilisateurs créés en premier)
2. **Teams** (équipes liées aux coachs)
3. **Matches** (matchs liés aux équipes)
4. **News** (actualités liées aux auteurs et équipes)
5. **Camps** (stages indépendants)
6. **Products** (produits indépendants)
7. **Partners** (partenaires indépendants)

---

## 🔄 Re-exécuter les seeders

Les seeders utilisent `findOrCreate`, donc :
- ✅ Tu peux les relancer sans créer de doublons
- ✅ Les données existantes ne sont pas écrasées
- ✅ Seules les nouvelles données sont ajoutées

Si tu veux repartir de zéro :

```bash
# Option 1 : Supprimer et recréer la base
dropdb olympique_poznan
createdb olympique_poznan

# Option 2 : Vider les tables (dans psql)
TRUNCATE TABLE users, teams, matches, news, camps, products, partners, 
               statistics, events, gallery, camp_registrations CASCADE;

# Puis relancer les seeders
npm run seed
```

---

## 🧪 Tester avec les données

### Test API avec curl

```bash
# Lister les camps
curl http://localhost:3000/api/camps

# Lister les produits
curl http://localhost:3000/api/products

# Lister les actualités
curl http://localhost:3000/api/news

# Détails d'un camp
curl http://localhost:3000/api/camps/1

# Login admin
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@olympiquepoznan.com","password":"Password123!"}'
```

### Test dans le navigateur

```
http://localhost:3000/api/camps
http://localhost:3000/api/products
http://localhost:3000/api/news
http://localhost:3000/api/teams
http://localhost:3000/api/matches
http://localhost:3000/api/partners
```

---

## 🛠️ Personnaliser les données

Tu peux modifier les seeders dans `/src/seeders/` :

```javascript
// Exemple : Ajouter un nouveau camp
// Fichier : src/seeders/05-camps.seed.js

camps.push({
  title: 'Mon nouveau stage',
  titlePl: 'Mój nowy obóz',
  // ... autres champs
});
```

Puis relancer :
```bash
npm run seed
```

---

## 📝 Structure des fichiers

```
src/seeders/
├── index.js                 # Runner principal
├── 01-users.seed.js        # Utilisateurs
├── 02-teams.seed.js        # Équipes
├── 03-matches.seed.js      # Matchs
├── 04-news.seed.js         # Actualités
├── 05-camps.seed.js        # Stages
├── 06-products.seed.js     # Produits
└── 07-partners.seed.js     # Partenaires
```

---

## 💡 Conseils

### Pour le développement frontend
1. `npm run seed` au début
2. Données réalistes immédiatement
3. Teste frontend avec des données

### Pour la démo
1. Base propre avec données cohérentes
2. Montre différentes fonctionnalités
3. Données en français ET polonais

### Pour les tests
1. Données prévisibles
2. Même jeu de données pour tous
3. Facile à recréer

---

## 🚨 Important

- **Mot de passe par défaut** : `Password123!` pour tous les users
- Les seeders **n'écrasent pas** les données existantes
- Les emails sont **uniques** (pas de doublons possibles)
- Les données sont **bilingues** (FR/PL)

---

## ✅ Checklist

Après avoir lancé les seeders, vérifie que tu as :

```bash
# Connexion à PostgreSQL
psql olympique_poznan

# Vérifier les données
SELECT COUNT(*) FROM users;        -- Devrait afficher 5
SELECT COUNT(*) FROM teams;        -- Devrait afficher 5
SELECT COUNT(*) FROM matches;      -- Devrait afficher 8
SELECT COUNT(*) FROM news;         -- Devrait afficher 5
SELECT COUNT(*) FROM camps;        -- Devrait afficher 5
SELECT COUNT(*) FROM products;     -- Devrait afficher 15
SELECT COUNT(*) FROM partners;     -- Devrait afficher 10
```

---

## 🎉 Prêt !

La base de données est maintenant remplie avec des données réalistes et cohérentes !

Maintenant on peut :
- ✅ Développer le frontend
- ✅ Tester l'API complète
- ✅ Créer des screenshots

---

**Développé par KAMIICODE** 💙⚽