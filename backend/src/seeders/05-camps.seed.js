import Camp from '../models/camp.model.js';

export const seedCamps = async () => {
  console.log('🌱 Seeding Camps...');

  const camps = [
    {
      title: 'Stage d\'été 2025 - Zakopane',
      titlePl: 'Obóz letni 2025 - Zakopane',
      description: `Stage intensif de football dans les montagnes des Tatras. 
      
Au programme :
- Entraînements techniques quotidiens (2 sessions par jour)
- Matchs amicaux et tournois
- Préparation physique en altitude
- Activités outdoor : randonnée, accrobranche
- Analyse vidéo et coaching personnalisé
- Soirées conviviales et barbecues

Hébergement en chalet confortable avec pension complète. Encadrement assuré par des entraîneurs diplômés UEFA.`,
      descriptionPl: `Intensywny obóz piłkarski w górach Tatr.

Program:
- Codzienne treningi techniczne (2 sesje dziennie)
- Mecze towarzyskie i turnieje
- Przygotowanie fizyczne na wysokości
- Zajęcia outdoor: wędrówki, park linowy
- Analiza wideo i indywidualny coaching
- Wieczory integracyjne i grillowanie

Zakwaterowanie w komfortowym domku z pełnym wyżywieniem. Opieka dyplomowanych trenerów UEFA.`,
      startDate: new Date('2025-07-15T10:00:00Z'),
      endDate: new Date('2025-07-28T16:00:00Z'),
      location: 'Zakopane, Pologne',
      locationPl: 'Zakopane, Polska',
      latitude: 49.299181,
      longitude: 19.949562,
      price: 850.00,
      currency: 'PLN',
      ageMin: 8,
      ageMax: 16,
      maxParticipants: 30,
      currentParticipants: 12,
      type: 'summer',
      level: 'all',
      activities: JSON.stringify([
        'Football technique',
        'Préparation physique',
        'Matchs amicaux',
        'Randonnée',
        'Accrobranche',
        'Analyse vidéo'
      ]),
      includedServices: JSON.stringify([
        'Hébergement en chalet',
        'Pension complète',
        'Encadrement professionnel',
        'Assurance',
        'Maillot du stage',
        'Transport local'
      ]),
      requirements: 'Certificat médical obligatoire. Niveau débutant accepté.',
      requirementsPl: 'Wymagane zaświadczenie lekarskie. Początkujący mile widziani.',
      contactEmail: 'camps@olympiquepoznan.com',
      contactPhone: '+48 123 456 789',
      registrationDeadline: new Date('2025-06-30T23:59:59Z'),
      status: 'open',
      isActive: true
    },
    {
      title: 'Stage de Noël 2024 - Poznań',
      titlePl: 'Obóz Bożonarodzeniowy 2024 - Poznań',
      description: `Stage intensif pendant les vacances de Noël pour progresser tout en s'amusant !

Programme complet :
- 4 heures d'entraînement par jour
- Tournoi de fin de stage
- Ateliers techniques (dribbles, passes, tirs)
- Initiation au futsal
- Jeux et animations

Sans hébergement (stage en journée uniquement).`,
      descriptionPl: `Intensywny obóz podczas ferii zimowych, aby rozwijać się przy jednoczesnej zabawie!

Pełny program:
- 4 godziny treningów dziennie
- Turniej końcowy
- Warsztaty techniczne (drybling, podania, strzały)
- Wprowadzenie do futsalu
- Gry i animacje

Bez zakwaterowania (tylko dzienny obóz).`,
      startDate: new Date('2024-12-26T09:00:00Z'),
      endDate: new Date('2024-12-30T17:00:00Z'),
      location: 'Centre sportif Olympique, Poznań',
      locationPl: 'Ośrodek sportowy Olympique, Poznań',
      latitude: 52.406376,
      longitude: 16.925167,
      price: 350.00,
      currency: 'PLN',
      ageMin: 6,
      ageMax: 14,
      maxParticipants: 40,
      currentParticipants: 28,
      type: 'winter',
      level: 'all',
      activities: JSON.stringify([
        'Entraînement football',
        'Futsal',
        'Tournoi',
        'Jeux sportifs',
        'Ateliers techniques'
      ]),
      includedServices: JSON.stringify([
        'Déjeuner',
        'Goûter',
        'Encadrement',
        'Prêt de matériel',
        'Diplôme de participation'
      ]),
      requirements: 'Certificat médical. Apporter ses chaussures et protège-tibias.',
      requirementsPl: 'Zaświadczenie lekarskie. Przynieś buty i ochraniacze.',
      contactEmail: 'camps@olympiquepoznan.com',
      contactPhone: '+48 123 456 789',
      registrationDeadline: new Date('2024-12-20T23:59:59Z'),
      status: 'open',
      isActive: true
    },
    {
      title: 'Stage de Pâques 2025 - Gdańsk',
      titlePl: 'Obóz Wielkanocny 2025 - Gdańsk',
      description: `Stage au bord de la mer Baltique combinant football et activités nautiques.

Points forts :
- Entraînement sur terrain synthétique de qualité
- Beach soccer sur la plage
- Activités nautiques (kayak, paddle)
- Visite de la vieille ville de Gdańsk
- Hébergement en résidence près de la plage

Un stage unique alliant sport et découverte !`,
      descriptionPl: `Obóz nad Morzem Bałtyckim łączący piłkę nożną z zajęciami wodnymi.

Atuty:
- Trening na wysokiej jakości nawierzchni syntetycznej
- Piłka nożna plażowa
- Zajęcia wodne (kajak, paddle)
- Zwiedzanie Starego Miasta w Gdańsku
- Zakwaterowanie w rezydencji przy plaży

Wyjątkowy obóz łączący sport i odkrywanie!`,
      startDate: new Date('2025-04-14T10:00:00Z'),
      endDate: new Date('2025-04-20T16:00:00Z'),
      location: 'Gdańsk, Pologne',
      locationPl: 'Gdańsk, Polska',
      latitude: 54.352025,
      longitude: 18.646638,
      price: 750.00,
      currency: 'PLN',
      ageMin: 10,
      ageMax: 17,
      maxParticipants: 25,
      currentParticipants: 8,
      type: 'spring',
      level: 'intermediate',
      activities: JSON.stringify([
        'Football classique',
        'Beach soccer',
        'Kayak',
        'Stand-up paddle',
        'Visite culturelle'
      ]),
      includedServices: JSON.stringify([
        'Hébergement',
        'Pension complète',
        'Transport depuis Poznań',
        'Encadrement',
        'Équipement nautique',
        'Assurance'
      ]),
      requirements: 'Bon niveau de natation requis pour les activités nautiques.',
      requirementsPl: 'Wymagana dobra umiejętność pływania do zajęć wodnych.',
      contactEmail: 'camps@olympiquepoznan.com',
      contactPhone: '+48 123 456 789',
      registrationDeadline: new Date('2025-03-31T23:59:59Z'),
      status: 'open',
      isActive: true
    },
    {
      title: 'Stage Élite - Perfectionnement',
      titlePl: 'Obóz Elite - Doskonalenie',
      description: `Stage de haut niveau pour les joueurs confirmés souhaitant se perfectionner.

Programme exigeant :
- Entraînements intensifs (3 sessions/jour)
- Préparation mentale avec psychologue sportif
- Nutrition et diététique sportive
- Analyse vidéo individuelle
- Tests physiques et techniques
- Matchs contre équipes académie
- Détection de talents

Encadrement par d'anciens joueurs professionnels et entraîneurs UEFA Pro.`,
      descriptionPl: `Obóz wysokiego poziomu dla zaawansowanych zawodników pragnących się doskonalić.

Program wymagający:
- Intensywne treningi (3 sesje/dzień)
- Przygotowanie mentalne z psychologiem sportowym
- Odżywianie i dietetyka sportowa
- Indywidualna analiza wideo
- Testy fizyczne i techniczne
- Mecze z zespołami akademii
- Wykrywanie talentów

Opieka byłych zawodów profesjonalnych i trenerów UEFA Pro.`,
      startDate: new Date('2025-08-03T09:00:00Z'),
      endDate: new Date('2025-08-16T18:00:00Z'),
      location: 'Centre de formation, Wrocław',
      locationPl: 'Ośrodek szkoleniowy, Wrocław',
      latitude: 51.107883,
      longitude: 17.038538,
      price: 1200.00,
      currency: 'PLN',
      ageMin: 14,
      ageMax: 18,
      maxParticipants: 20,
      currentParticipants: 5,
      type: 'summer',
      level: 'advanced',
      activities: JSON.stringify([
        'Entraînement intensif',
        'Préparation mentale',
        'Nutrition',
        'Analyse vidéo',
        'Tests physiques',
        'Matchs compétitifs'
      ]),
      includedServices: JSON.stringify([
        'Hébergement premium',
        'Repas équilibrés',
        'Suivi individualisé',
        'Bilan complet',
        'Équipement professionnel',
        'Assurance'
      ]),
      requirements: 'Sélection sur dossier. Niveau confirmé exigé. Lettre de motivation.',
      requirementsPl: 'Selekcja na podstawie aplikacji. Wymagany potwierdzony poziom. List motywacyjny.',
      contactEmail: 'elite@olympiquepoznan.com',
      contactPhone: '+48 123 456 789',
      registrationDeadline: new Date('2025-07-15T23:59:59Z'),
      status: 'open',
      isActive: true
    },
    {
      title: 'Stage Automne 2024 - Poznań (COMPLET)',
      titlePl: 'Obóz Jesienny 2024 - Poznań (PEŁNY)',
      description: `Stage d'automne complet. Inscrivez-vous sur liste d'attente !`,
      descriptionPl: `Jesienny obóz kompletny. Zapisz się na listę rezerwową!`,
      startDate: new Date('2024-10-28T09:00:00Z'),
      endDate: new Date('2024-11-01T17:00:00Z'),
      location: 'Centre sportif Olympique, Poznań',
      locationPl: 'Ośrodek sportowy Olympique, Poznań',
      latitude: 52.406376,
      longitude: 16.925167,
      price: 300.00,
      currency: 'PLN',
      ageMin: 7,
      ageMax: 15,
      maxParticipants: 35,
      currentParticipants: 35,
      type: 'autumn',
      level: 'all',
      activities: JSON.stringify(['Football', 'Jeux sportifs']),
      includedServices: JSON.stringify(['Déjeuner', 'Encadrement']),
      requirements: 'Certificat médical',
      requirementsPl: 'Zaświadczenie lekarskie',
      contactEmail: 'camps@olympiquepoznan.com',
      contactPhone: '+48 123 456 789',
      registrationDeadline: new Date('2024-10-20T23:59:59Z'),
      status: 'full',
      isActive: false
    }
  ];

  for (const campData of camps) {
    const [camp, created] = await Camp.findOrCreate({
      where: { 
        title: campData.title
      },
      defaults: campData
    });
    
    if (created) {
      console.log(`   ✓ Created camp: ${camp.title}`);
    } else {
      console.log(`   - Camp already exists: ${camp.title}`);
    }
  }

  console.log('✅ Camps seeded successfully\n');
};