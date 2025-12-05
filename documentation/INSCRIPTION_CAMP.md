# 📝 Module d'Inscriptions aux Camps - Olympique Poznan

**Réponse : BACKEND + FRONTEND** ! 🔥

- **Frontend** = Le formulaire (HTML/CSS/JS)
- **Backend** = La sauvegarde, validation, gestion des places, emails

Sans backend, on ne peut PAS :
- ❌ Sauvegarder les inscriptions
- ❌ Gérer les places disponibles
- ❌ Envoyer d'emails de confirmation
- ❌ Tracer les paiements
- ❌ Avoir un espace admin

---

## ✅ Ce qui a été créé (Backend)

### Modèle `CampRegistration`
Toutes les infos nécessaires pour une inscription :

**Participant** :
- Nom, prénom, date de naissance, sexe

**Parent/Tuteur** :
- Nom, prénom, email, téléphone

**Adresse** :
- Adresse complète, ville, code postal, pays

**Médical** :
- Infos médicales (allergies, traitements)
- Contact d'urgence + téléphone

**Sport** :
- Niveau (débutant/intermédiaire/avancé)
- Expérience précédente

**Divers** :
- Restrictions alimentaires
- Besoins spéciaux
- Commentaires

**Statut** :
- Status inscription (pending/confirmed/paid/cancelled/waiting_list)
- Status paiement (pending/partial/completed/refunded)
- Montant + date de paiement

**Consentements** :
- CGV acceptées
- RGPD
- Droit à l'image

---

## 🔌 API Endpoints

### Routes publiques (sans auth)

#### S'inscrire à un camp
```http
POST /api/camp-registrations
```

**Body** :
```json
{
  "campId": 1,
  
  "childFirstName": "Lucas",
  "childLastName": "Kowalski",
  "childDateOfBirth": "2012-05-15",
  "childGender": "male",
  
  "parentFirstName": "Anna",
  "parentLastName": "Kowalski",
  "parentEmail": "anna.kowalski@example.com",
  "parentPhone": "+48 123 456 789",
  
  "address": "ul. Główna 123",
  "city": "Poznań",
  "postalCode": "60-100",
  "country": "Pologne",
  
  "medicalInfo": "Asthme léger, inhalateur disponible",
  "emergencyContact": "Piotr Kowalski (père)",
  "emergencyPhone": "+48 987 654 321",
  
  "sportLevel": "intermediate",
  "previousExperience": "2 ans de football en club",
  
  "dietaryRestrictions": "Végétarien",
  "specialNeeds": "",
  "comments": "Préfère jouer attaquant",
  
  "termsAccepted": true,
  "gdprConsent": true,
  "photoConsent": true
}
```

**Réponse** :
```json
{
  "success": true,
  "message": "Inscription créée avec succès",
  "data": {
    "id": 1,
    "status": "pending",
    "confirmationToken": "a1b2c3d4...",
    ...
  }
}
```

#### Confirmer l'inscription par email
```http
POST /api/camp-registrations/confirm/:token
```

#### Consulter ses inscriptions (parent)
```http
GET /api/camp-registrations/parent?email=anna.kowalski@example.com
```

### Routes admin (nécessitent authentification)

```http
GET    /api/camp-registrations                # Toutes les inscriptions
GET    /api/camp-registrations/camp/:campId   # Par camp
GET    /api/camp-registrations/:id            # Une inscription
PUT    /api/camp-registrations/:id            # Modifier
POST   /api/camp-registrations/:id/cancel     # Annuler
POST   /api/camp-registrations/:id/pay        # Marquer comme payé
DELETE /api/camp-registrations/:id            # Supprimer
```

---

## 💻 Exemple Frontend (SvelteKit)

### Formulaire d'inscription

**src/routes/camps/[id]/register/+page.svelte**

```svelte
<script>
  import { goto } from '$app/navigation';
  export let data;
  
  const { camp } = data;
  
  let formData = {
    campId: camp.id,
    childFirstName: '',
    childLastName: '',
    childDateOfBirth: '',
    childGender: 'male',
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pologne',
    medicalInfo: '',
    emergencyContact: '',
    emergencyPhone: '',
    sportLevel: 'beginner',
    previousExperience: '',
    dietaryRestrictions: '',
    specialNeeds: '',
    comments: '',
    termsAccepted: false,
    gdprConsent: false,
    photoConsent: false
  };
  
  let errors = {};
  let loading = false;
  
  async function handleSubmit() {
    // Validation côté client
    errors = {};
    
    if (!formData.childFirstName) errors.childFirstName = 'Prénom requis';
    if (!formData.parentEmail) errors.parentEmail = 'Email requis';
    if (!formData.termsAccepted) {
      errors.terms = 'Vous devez accepter les conditions';
    }
    if (!formData.gdprConsent) {
      errors.gdpr = 'Vous devez accepter la politique RGPD';
    }
    
    if (Object.keys(errors).length > 0) return;
    
    loading = true;
    
    try {
      const response = await fetch('/api/camp-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        goto('/camps/register/success');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Erreur lors de l\'inscription');
    } finally {
      loading = false;
    }
  }
  
  // Calculer l'âge automatiquement
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  
  $: childAge = formData.childDateOfBirth ? calculateAge(formData.childDateOfBirth) : null;
</script>

<div class="registration-page">
  <div class="camp-header">
    <h1>Inscription au stage</h1>
    <h2>{camp.title}</h2>
    <p>
      📅 Du {new Date(camp.startDate).toLocaleDateString('fr-FR')} 
      au {new Date(camp.endDate).toLocaleDateString('fr-FR')}
    </p>
    <p>💰 Prix : {camp.price}€</p>
  </div>
  
  <form on:submit|preventDefault={handleSubmit} class="registration-form">
    
    <!-- PARTICIPANT -->
    <section class="form-section">
      <h3>👦 Informations du participant</h3>
      
      <div class="form-row">
        <div class="form-group">
          <label for="childFirstName">Prénom *</label>
          <input 
            type="text" 
            id="childFirstName" 
            bind:value={formData.childFirstName}
            required
          />
          {#if errors.childFirstName}
            <span class="error">{errors.childFirstName}</span>
          {/if}
        </div>
        
        <div class="form-group">
          <label for="childLastName">Nom *</label>
          <input 
            type="text" 
            id="childLastName" 
            bind:value={formData.childLastName}
            required
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="childDateOfBirth">Date de naissance *</label>
          <input 
            type="date" 
            id="childDateOfBirth" 
            bind:value={formData.childDateOfBirth}
            max={new Date().toISOString().split('T')[0]}
            required
          />
          {#if childAge}
            <small>Âge : {childAge} ans</small>
          {/if}
        </div>
        
        <div class="form-group">
          <label for="childGender">Sexe *</label>
          <select id="childGender" bind:value={formData.childGender} required>
            <option value="male">Garçon</option>
            <option value="female">Fille</option>
            <option value="other">Autre</option>
          </select>
        </div>
      </div>
    </section>
    
    <!-- PARENT/TUTEUR -->
    <section class="form-section">
      <h3>👨‍👩‍👦 Informations du parent/tuteur</h3>
      
      <div class="form-row">
        <div class="form-group">
          <label for="parentFirstName">Prénom *</label>
          <input 
            type="text" 
            id="parentFirstName" 
            bind:value={formData.parentFirstName}
            required
          />
        </div>
        
        <div class="form-group">
          <label for="parentLastName">Nom *</label>
          <input 
            type="text" 
            id="parentLastName" 
            bind:value={formData.parentLastName}
            required
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="parentEmail">Email *</label>
          <input 
            type="email" 
            id="parentEmail" 
            bind:value={formData.parentEmail}
            required
          />
        </div>
        
        <div class="form-group">
          <label for="parentPhone">Téléphone *</label>
          <input 
            type="tel" 
            id="parentPhone" 
            bind:value={formData.parentPhone}
            required
          />
        </div>
      </div>
    </section>
    
    <!-- ADRESSE -->
    <section class="form-section">
      <h3>📍 Adresse</h3>
      
      <div class="form-group">
        <label for="address">Adresse complète *</label>
        <input 
          type="text" 
          id="address" 
          bind:value={formData.address}
          placeholder="Rue, numéro"
          required
        />
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="postalCode">Code postal *</label>
          <input 
            type="text" 
            id="postalCode" 
            bind:value={formData.postalCode}
            required
          />
        </div>
        
        <div class="form-group">
          <label for="city">Ville *</label>
          <input 
            type="text" 
            id="city" 
            bind:value={formData.city}
            required
          />
        </div>
        
        <div class="form-group">
          <label for="country">Pays *</label>
          <input 
            type="text" 
            id="country" 
            bind:value={formData.country}
            required
          />
        </div>
      </div>
    </section>
    
    <!-- MÉDICAL -->
    <section class="form-section">
      <h3>🏥 Informations médicales</h3>
      
      <div class="form-group">
        <label for="medicalInfo">Informations médicales importantes</label>
        <textarea 
          id="medicalInfo" 
          bind:value={formData.medicalInfo}
          placeholder="Allergies, traitements en cours, problèmes de santé..."
          rows="3"
        ></textarea>
        <small>Ces informations resteront confidentielles</small>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="emergencyContact">Contact d'urgence *</label>
          <input 
            type="text" 
            id="emergencyContact" 
            bind:value={formData.emergencyContact}
            placeholder="Nom et lien de parenté"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="emergencyPhone">Téléphone d'urgence *</label>
          <input 
            type="tel" 
            id="emergencyPhone" 
            bind:value={formData.emergencyPhone}
            required
          />
        </div>
      </div>
    </section>
    
    <!-- SPORT -->
    <section class="form-section">
      <h3>⚽ Expérience sportive</h3>
      
      <div class="form-group">
        <label for="sportLevel">Niveau *</label>
        <select id="sportLevel" bind:value={formData.sportLevel} required>
          <option value="beginner">Débutant</option>
          <option value="intermediate">Intermédiaire</option>
          <option value="advanced">Avancé</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="previousExperience">Expérience précédente</label>
        <textarea 
          id="previousExperience" 
          bind:value={formData.previousExperience}
          placeholder="Clubs, années de pratique, compétitions..."
          rows="3"
        ></textarea>
      </div>
    </section>
    
    <!-- DIVERS -->
    <section class="form-section">
      <h3>📝 Informations complémentaires</h3>
      
      <div class="form-group">
        <label for="dietaryRestrictions">Restrictions alimentaires</label>
        <textarea 
          id="dietaryRestrictions" 
          bind:value={formData.dietaryRestrictions}
          placeholder="Allergies alimentaires, végétarien, halal..."
          rows="2"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="specialNeeds">Besoins spéciaux</label>
        <textarea 
          id="specialNeeds" 
          bind:value={formData.specialNeeds}
          rows="2"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="comments">Commentaires</label>
        <textarea 
          id="comments" 
          bind:value={formData.comments}
          placeholder="Questions, remarques..."
          rows="3"
        ></textarea>
      </div>
    </section>
    
    <!-- CONSENTEMENTS -->
    <section class="form-section">
      <h3>✅ Consentements</h3>
      
      <div class="checkbox-group">
        <label>
          <input 
            type="checkbox" 
            bind:checked={formData.termsAccepted}
            required
          />
          J'accepte les <a href="/terms" target="_blank">conditions générales</a> *
        </label>
        {#if errors.terms}
          <span class="error">{errors.terms}</span>
        {/if}
      </div>
      
      <div class="checkbox-group">
        <label>
          <input 
            type="checkbox" 
            bind:checked={formData.gdprConsent}
            required
          />
          J'accepte la <a href="/privacy" target="_blank">politique de confidentialité (RGPD)</a> *
        </label>
        {#if errors.gdpr}
          <span class="error">{errors.gdpr}</span>
        {/if}
      </div>
      
      <div class="checkbox-group">
        <label>
          <input 
            type="checkbox" 
            bind:checked={formData.photoConsent}
          />
          J'autorise la prise et l'utilisation de photos/vidéos à des fins promotionnelles
        </label>
      </div>
    </section>
    
    <div class="form-actions">
      <button type="submit" class="btn-primary" disabled={loading}>
        {loading ? 'Inscription en cours...' : 'S\'inscrire au stage'}
      </button>
    </div>
  </form>
</div>

<style>
  .registration-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .camp-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .form-section {
    background: white;
    padding: 2rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .form-section h3 {
    margin-top: 0;
    color: #667eea;
    border-bottom: 2px solid #667eea;
    padding-bottom: 0.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
    color: #333;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .checkbox-group {
    margin-bottom: 1rem;
  }
  
  .checkbox-group label {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .checkbox-group input[type="checkbox"] {
    margin-top: 0.25rem;
  }
  
  .error {
    color: #e63946;
    font-size: 0.85rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .form-actions {
    margin-top: 2rem;
    text-align: center;
  }
  
  .btn-primary {
    background: #667eea;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #5568d3;
  }
  
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  small {
    color: #666;
    font-size: 0.85rem;
    display: block;
    margin-top: 0.25rem;
  }
</style>
```

---

## ✅ Checklist d'implémentation

### Backend (✅ Déjà fait)
- [x] Modèle `CampRegistration`
- [x] Migration SQL
- [x] Service complet
- [x] Controller
- [x] Routes API
- [x] Validation Joi
- [x] Relations avec Camp

### Frontend (À faire)
- [ ] Créer la page `/camps/[id]/register`
- [ ] Formulaire complet
- [ ] Validation côté client
- [ ] Envoi vers l'API
- [ ] Page de confirmation
- [ ] Affichage "Places restantes" sur les camps

### Bonus (Plus tard)
- [ ] Envoi d'emails (Nodemailer)
- [ ] Paiement en ligne (Stripe)
- [ ] Espace parent (voir ses inscriptions)
- [ ] Génération de PDF (reçu, fiche d'inscription)

---

## 🎯 Résumé

**Frontend** = Formulaire HTML  
**Backend** = Tout le reste (sauvegarde, gestion, emails, paiements)

**Tu DOIS utiliser le backend** pour les inscriptions ! C'est maintenant prêt à l'emploi. 🚀

---

Développé par **KAMIICODE**