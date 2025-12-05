# 🏃‍♂️ Olympique Poznan

Site web officiel de l'association sportive polonaise Olympique Poznan.

## 📋 À propos du projet

Application web multilingue développée pour l'association sportive Olympique Poznan, permettant la gestion des équipes, des joueurs et la présentation des activités de l'association.

## ✨ Fonctionnalités principales

- **Site multilingue** : Support du français et du polonais
- **Gestion des équipes** : Présentation des différentes équipes et catégories
- **Profils des joueurs** : Fiches détaillées des membres de l'association
- **Boutique** : Showcase des produits et merchandising
- **Actualités** : Publication des dernières nouvelles et événements
- **Interface d'administration** : Gestion du contenu en backend

## 🛠️ Technologies utilisées

### Frontend
- **SvelteKit** : Framework principal
- **TypeScript** : Typage statique
- **CSS3** : Styling responsive

### Backend
- **Node.js** : Environnement d'exécution
- **PostgreSQL** : Base de données relationnelle
- **API REST** : Architecture séparée frontend/backend

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- PostgreSQL (v14+)
- npm ou pnpm

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
# 🎉 Backend Olympique Poznan - Package Complet

## 📦 Version Finale Recommandée

### **[olympique-poznan-backend-final.zip](computer:///mnt/user-data/outputs/olympique-poznan-backend-final.zip)** (42 KB) ⭐

**Cette version inclut TOUT** :
- ✅ Backend complet avec 10 entités
- ✅ Système d'erreurs HTTP personnalisées
- ✅ Authentification JWT prête à activer
- ✅ Module Camps/Stages **NOUVEAU**
- ✅ Documentation complète

---

## 🆕 Nouveautés par rapport à la v1.0

### 1. **Module Camps/Stages** 🏕️
Gestion complète des stages sportifs pendant les vacances :
- Création/modification/suppression
- Filtrage par saison (été, hiver, printemps, automne)
- Gestion des places disponibles
- Support multilingue FR/PL
- Dates limites d'inscription
- Prix, âge, niveau, activités

**Endpoints API** :
```
GET    /api/camps                    # Tous les camps
GET    /api/camps/upcoming           # Camps à venir
GET    /api/camps/available          # Camps avec places
GET    /api/camps/season/:type       # Par saison
GET    /api/camps/:id                # Détails d'un camp
POST   /api/camps                    # Créer (admin)
PUT    /api/camps/:id                # Modifier (admin)
DELETE /api/camps/:id                # Supprimer (admin)
```

### 2. **Gestion d'erreurs professionnelle** 🔐
- 7 classes d'erreurs HTTP typées
- Messages clairs et cohérents
- Codes HTTP appropriés automatiques

### 3. **Authentification JWT** 🔒
- Middleware complet (authMiddleware, requireRole, etc.)
- Génération de tokens access + refresh
- Prêt à activer en 5 minutes

### 4. **Service User amélioré** 👤
- Profils publics/privés séparés
- Gestion du profil (updateProfile, updatePassword)
- Validation renforcée

---

## 📊 Comparatif des versions

| Fonctionnalité | v1.0 | v2.0 | **Final** |
|----------------|------|------|-----------|
| Entités | 9 | 9 | **10** |
| Erreurs HTTP | ❌ | ✅ | ✅ |
| JWT | ❌ | ✅ | ✅ |
| Module Camps | ❌ | ❌ | **✅** |
| User Service | Basic | Amélioré | Amélioré |
| Documentation | ✅ | ✅✅ | ✅✅✅ |

---

## 🚀 Installation rapide

```bash
# 1. Extraire
unzip olympique-poznan-backend-final.zip
cd olympique-poznan-backend

# 2. Installer
npm install

# 3. Configurer
cp .env.example .env
# Éditer .env avec tes valeurs

# 4. Créer la DB
createdb olympique_poznan

# 5. Lancer
npm run dev
```

Le serveur démarre sur http://localhost:3000 🎉

---

## 📚 Documentation disponible

### Guides généraux
1. **[README.md]** - Documentation technique complète
2. **[GUIDE_DEMARRAGE.md](computer:///mnt/user-data/outputs/GUIDE_DEMARRAGE.md)** - Installation en 5 étapes
3. **[INTEGRATION_FRONTEND.md](computer:///mnt/user-data/outputs/INTEGRATION_FRONTEND.md)** - Utilisation avec SvelteKit
techniques v2.0
5. **[GUIDE_JWT.md](computer:///mnt/user-data/outputs/GUIDE_JWT.md)** - Activation JWT en 5 étapes
6. **[MODULE_CAMPS.md](computer:///mnt/user-data/outputs/MODULE_CAMPS.md)** - Guide complet des camps/stages

---

### 10 Entités complètes
1. **Users** - Utilisateurs/Joueurs/Coachs
2. **Teams** - Équipes
3. **Matches** - Matchs
4. **News** - Actualités
5. **Products** - Merchandising
6. **Events** - Événements
7. **Gallery** - Galerie photos
8. **Partners** - Partenaires/Sponsors
9. **Statistics** - Statistiques joueurs
10. **Camps** - Stages/Camps

### 90+ Endpoints API RESTful
- CRUD complet pour chaque entité
- Filtres intelligents
- Pagination automatique
- Endpoints spécialisés (upcoming, available, top-scorers, etc.)

### Fonctionnalités avancées
✅ Validation automatique (Joi)  
✅ Erreurs HTTP typées  
✅ Authentification JWT (prête à activer)  
✅ Support multilingue FR/PL  
✅ Sécurité Argon2  
✅ Relations Sequelize  
✅ Migrations SQL  

---

### ✅ Backend
**Avantages** :
- Gestion dynamique (création/modification sans redéployer)
- Interface admin pour ton frère
- Possibilité d'inscriptions en ligne plus tard
- Données structurées et cohérentes
- Multilingue automatique

### ❌ Frontend seulement
**Inconvénients** :
- Données en dur dans le code
- Modification = redéploiement
- Pas d'interface admin
- Pas d'évolution possible (inscriptions, paiements)

---

## 💡 Cas d'usage du module Camps

### Page d'accueil
```svelte
<!-- Afficher les 3 prochains stages -->
{#each upcomingCamps as camp}
  <div class="camp-preview">
    <h3>{camp.title}</h3>
    <p>Du {camp.startDate} au {camp.endDate}</p>
    <p>{camp.price}€ - Places : {camp.maxParticipants - camp.currentParticipants}</p>
  </div>
{/each}
```

### Page dédiée aux camps
- Filtrer par saison (été/hiver)
- Filtrer par niveau (débutant/confirmé)
- Afficher la disponibilité en temps réel
- Détails complets (activités, services inclus, prérequis)

### Futur (évolutions possibles)
- Formulaire d'inscription
- Paiement en ligne
- Confirmation par email
- Liste d'attente si complet

---

### Exemples de code
- Routes protégées avec JWT
- Intégration frontend SvelteKit
- Gestion d'erreurs
- Middleware d'authentification

### Structure professionnelle
- Architecture MVC claire
- Services découplés
- Validation centralisée
- Gestion d'erreurs unifiée

---

## ✅ Checklist de démarrage

- [ ] Extraire et installer (`npm install`)
- [ ] Configurer `.env` (DB + secrets JWT)
- [ ] Créer la base de données PostgreSQL
- [ ] Lancer le serveur (`npm run dev`)
- [ ] Tester l'API : http://localhost:3000
- [ ] Consulter la doc pour activer JWT si besoin

---

## 🆘 Besoin d'aide ?

1. Consulte les guides dans `/mnt/user-data/outputs/`
2. Vérifier les logs du serveur
3. S'assurer que PostgreSQL fonctionne
4. Vérifier la configuration `.env`

---

## 🎉 Résumé

**backend professionnel et complet** pour Olympique Poznan avec :

✅ 10 entités 
✅ 90+ endpoints API  
✅ Authentification JWT prête  
✅ Gestion d'erreurs avancée  
✅ Support multilingue FR/PL  
✅ Documentation exhaustive  
✅ Prêt pour la production  

---

Développé avec ❤️ par **KAMIICODE**