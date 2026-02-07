import Partner from '../models/partner.model.js';

export const seedPartners = async () => {
  console.log('🌱 Seeding Partners...');

  const partners = [
    {
      name: 'Le Petit Paris',
      description: 'Patisserie française authentique à Poznań',
      descriptionPl: 'Autentyczna francuska restauracja w Poznaniu',
      descriptionEn: 'Authentic French patisserie in Poznań',
      logoUrl: null,
      logoPath: '/sponsors/petit-black.svg',
      websiteUrl: 'https://www.petitparis.com.pl',
      category: 'main_sponsor',
      displayOrder: 1,
      isActive: true
    },
    {
      name: 'endo design',
      description: 'Studio de design et d\'architecture d\'intérieur',
      descriptionPl: 'Studio projektowe i architektury wnętrz',
      descriptionEn: 'Design and interior architecture studio',
      logoUrl: null,
      logoPath: '/sponsors/endodesign.png',
      websiteUrl: 'https://www.endodesign.pl/',
      category: 'official_partner',
      displayOrder: 2,
      isActive: true
    },
    {
      name: 'EXCO A2A Polska',
      description: 'Solutions énergétiques et environnementales',
      descriptionPl: 'Rozwiązania energetyczne i środowiskowe',
      descriptionEn: 'Energy and environmental solutions',
      logoUrl: null,
      logoPath: '/sponsors/exco.png',
      websiteUrl: 'https://exco.pl/',
      category: 'official_partner',
      displayOrder: 0,
      isActive: true
    },
    {
      name: 'uzdrowisko',
      description: 'Centre de santé et bien-être',
      descriptionPl: 'Centrum zdrowia i wellness',
      descriptionEn: 'Health and wellness center',
      logoUrl: null,
      logoPath: '/sponsors/uz.png',
      websiteUrl: 'https://uzdrowisko.org/',
      category: 'main_sponsor',
      displayOrder: 3,
      isActive: true
    }
  ];

  for (const partnerData of partners) {
    const [partner, created] = await Partner.findOrCreate({
      where: { 
        name: partnerData.name
      },
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