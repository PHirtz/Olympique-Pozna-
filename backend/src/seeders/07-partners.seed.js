import Partner from '../models/partner.model.js';

export const seedPartners = async () => {
  console.log('🌱 Seeding Partners...');

  const partners = [
    {
      name: 'SportTech',
      description: 'Équipementier officiel du club depuis 2020. Leader en matériel sportif.',
      descriptionPl: 'Oficjalny dostawca sprzętu klubu od 2020 roku. Lider w sprzęcie sportowym.',
      websiteUrl: 'https://www.sporttech.pl',
      category: 'main_sponsor',
      displayOrder: 1,
      isActive: true
    },
    {
      name: 'Banque Poznań',
      description: 'Partenaire bancaire principal. Soutien financier pour nos équipes jeunes.',
      descriptionPl: 'Główny partner bankowy. Wsparcie finansowe dla naszych drużyn młodzieżowych.',
      websiteUrl: 'https://www.banquepoznan.pl',
      category: 'main_sponsor',
      displayOrder: 2,
      isActive: true
    },
    {
      name: 'Resto Polonais',
      description: 'Restauration officielle du club. Traiteur pour nos événements.',
      descriptionPl: 'Oficjalna restauracja klubu. Catering na nasze wydarzenia.',
      websiteUrl: 'https://www.restopolonais.pl',
      category: 'official_partner',
      displayOrder: 3,
      isActive: true
    },
    {
      name: 'TranspoSport',
      description: 'Transport officiel des équipes. Déplacements pour tous les matchs.',
      descriptionPl: 'Oficjalny transport zespołów. Przejazdy na wszystkie mecze.',
      websiteUrl: 'https://www.transposport.pl',
      category: 'official_partner',
      displayOrder: 4,
      isActive: true
    },
    {
      name: 'PhysioMax',
      description: 'Centre de kinésithérapie partenaire. Soins et récupération des joueurs.',
      descriptionPl: 'Partnerskie centrum fizjoterapii. Opieka i regeneracja zawodników.',
      websiteUrl: 'https://www.physiomax.pl',
      category: 'official_partner',
      displayOrder: 5,
      isActive: true
    },
    {
      name: 'Nike Poland',
      description: 'Fournisseur de chaussures et accessoires.',
      descriptionPl: 'Dostawca butów i akcesoriów.',
      websiteUrl: 'https://www.nike.com/pl',
      category: 'supplier',
      displayOrder: 6,
      isActive: true
    },
    {
      name: 'H2O Sport Drinks',
      description: 'Boissons sportives officielles du club.',
      descriptionPl: 'Oficjalne napoje sportowe klubu.',
      websiteUrl: 'https://www.h2osport.pl',
      category: 'supplier',
      displayOrder: 7,
      isActive: true
    },
    {
      name: 'Radio Poznań Sport',
      description: 'Diffusion de tous nos matchs en direct.',
      descriptionPl: 'Transmisja wszystkich naszych meczów na żywo.',
      websiteUrl: 'https://www.radiopoznansport.pl',
      category: 'media_partner',
      displayOrder: 8,
      isActive: true
    },
    {
      name: 'Gazeta Sportowa',
      description: 'Couverture médiatique de toute la saison.',
      descriptionPl: 'Relacja medialna z całego sezonu.',
      websiteUrl: 'https://www.gazetasportowa.pl',
      category: 'media_partner',
      displayOrder: 9,
      isActive: true
    },
    {
      name: 'TV Sport Polska',
      description: 'Retransmission télévisée des matchs importants.',
      descriptionPl: 'Transmisja telewizyjna ważnych meczów.',
      websiteUrl: 'https://www.tvsportpolska.pl',
      category: 'media_partner',
      displayOrder: 10,
      isActive: true
    }
  ];

  for (const partnerData of partners) {
    const [partner, created] = await Partner.findOrCreate({
      where: { name: partnerData.name },
      defaults: partnerData
    });
    
    if (created) {
      console.log(`   ✓ Created partner: ${partner.name}`);
    } else {
      console.log(`   - Partner already exists: ${partner.name}`);
    }
  }

  console.log('✅ Partners seeded successfully\n');
};