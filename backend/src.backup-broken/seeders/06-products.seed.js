import Product from '../models/product.model.js';

export const seedProducts = async () => {
  console.log('🌱 Seeding Products...');

  const products = [
    {
      name: 'Maillot Domicile 2024/2025',
      namePl: 'Koszulka Domowa 2024/2025',
      description: 'Maillot officiel domicile Olympique Poznan saison 2024/2025. Tissu respirant et confortable.',
      descriptionPl: 'Oficjalna koszulka domowa Olympique Poznań sezon 2024/2025. Oddychająca i wygodna tkanina.',
      price: 89.99,
      currency: 'PLN',
      category: 'jersey',
      stock: 50,
      isAvailable: true,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Bleu royal', 'Blanc'])
    },
    {
      name: 'Maillot Extérieur 2024/2025',
      namePl: 'Koszulka Wyjazdowa 2024/2025',
      description: 'Maillot officiel extérieur. Design moderne avec bandes latérales.',
      descriptionPl: 'Oficjalna koszulka wyjazdowa. Nowoczesny design z bocznymi paskami.',
      price: 89.99,
      currency: 'PLN',
      category: 'jersey',
      stock: 45,
      isAvailable: true,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Blanc', 'Bleu'])
    },
    {
      name: 'Short Officiel',
      namePl: 'Oficjalne Spodenki',
      description: 'Short de match officiel. Tissu technique léger.',
      descriptionPl: 'Oficjalne spodenki meczowe. Lekka tkanina techniczna.',
      price: 39.99,
      currency: 'PLN',
      category: 'clothing',
      stock: 60,
      isAvailable: true,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Bleu', 'Blanc', 'Noir'])
    },
    {
      name: 'Chaussettes Officielles',
      namePl: 'Oficjalne Skarpety',
      description: 'Paire de chaussettes de match. Maintien renforcé.',
      descriptionPl: 'Para skarpet meczowych. Wzmocnione podtrzymanie.',
      price: 15.99,
      currency: 'PLN',
      category: 'clothing',
      stock: 100,
      isAvailable: true,
      sizes: JSON.stringify(['35-38', '39-42', '43-46']),
      colors: JSON.stringify(['Bleu', 'Blanc'])
    },
    {
      name: 'Veste de Survêtement',
      namePl: 'Bluza Treningowa',
      description: 'Veste zippée avec logo brodé. Idéale pour l\'échauffement.',
      descriptionPl: 'Bluza na zamek z wyhaftowanym logo. Idealna do rozgrzewki.',
      price: 119.99,
      currency: 'PLN',
      category: 'clothing',
      stock: 30,
      isAvailable: true,
      sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Bleu marine', 'Noir'])
    },
    {
      name: 'Pantalon de Survêtement',
      namePl: 'Spodnie Treningowe',
      description: 'Pantalon confortable avec poches zippées.',
      descriptionPl: 'Wygodne spodnie z zamykana kieszeniami.',
      price: 79.99,
      currency: 'PLN',
      category: 'clothing',
      stock: 35,
      isAvailable: true,
      sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Bleu marine', 'Noir'])
    },
    {
      name: 'Écharpe Supporter',
      namePl: 'Szalik Kibica',
      description: 'Écharpe tricotée aux couleurs du club. 140cm de longueur.',
      descriptionPl: 'Szalik dziewiarki w barwach klubu. Długość 140cm.',
      price: 29.99,
      currency: 'PLN',
      category: 'accessories',
      stock: 80,
      isAvailable: true,
      colors: JSON.stringify(['Bleu/Blanc'])
    },
    {
      name: 'Bonnet Olympique Poznan',
      namePl: 'Czapka Olympique Poznań',
      description: 'Bonnet en laine avec logo brodé.',
      descriptionPl: 'Wełniana czapka z wyhaftowanym logo.',
      price: 24.99,
      currency: 'PLN',
      category: 'accessories',
      stock: 50,
      isAvailable: true,
      colors: JSON.stringify(['Bleu', 'Noir', 'Gris'])
    },
    {
      name: 'Casquette Club',
      namePl: 'Czapka z Daszkiem Klubowa',
      description: 'Casquette ajustable avec logo frontal.',
      descriptionPl: 'Regulowana czapka z logo z przodu.',
      price: 34.99,
      currency: 'PLN',
      category: 'accessories',
      stock: 40,
      isAvailable: true,
      colors: JSON.stringify(['Bleu', 'Noir', 'Blanc'])
    },
    {
      name: 'Sac de Sport',
      namePl: 'Torba Sportowa',
      description: 'Grand sac avec compartiment chaussures. 60L.',
      descriptionPl: 'Duża torba z przegrodą na buty. 60L.',
      price: 69.99,
      currency: 'PLN',
      category: 'accessories',
      stock: 25,
      isAvailable: true,
      colors: JSON.stringify(['Bleu/Noir', 'Noir'])
    },
    {
      name: 'Ballon Officiel Entraînement',
      namePl: 'Oficjalna Piłka Treningowa',
      description: 'Ballon taille 5 aux couleurs du club.',
      descriptionPl: 'Piłka rozmiar 5 w barwach klubu.',
      price: 49.99,
      currency: 'PLN',
      category: 'equipment',
      stock: 30,
      isAvailable: true,
      colors: JSON.stringify(['Bleu/Blanc'])
    },
    {
      name: 'Protège-tibias Pro',
      namePl: 'Ochraniacze Pro',
      description: 'Protection renforcée avec chaussette intégrée.',
      descriptionPl: 'Wzmocniona ochrona ze zintegrowaną skarpetą.',
      price: 44.99,
      currency: 'PLN',
      category: 'equipment',
      stock: 40,
      isAvailable: true,
      sizes: JSON.stringify(['S', 'M', 'L']),
      colors: JSON.stringify(['Bleu', 'Noir'])
    },
    {
      name: 'Gourde Olympique Poznan',
      namePl: 'Bidon Olympique Poznań',
      description: 'Gourde isotherme 750ml avec logo.',
      descriptionPl: 'Bidon termiczny 750ml z logo.',
      price: 19.99,
      currency: 'PLN',
      category: 'accessories',
      stock: 60,
      isAvailable: true,
      colors: JSON.stringify(['Bleu', 'Blanc', 'Noir'])
    },
    {
      name: 'Porte-clés Club',
      namePl: 'Brelok Klubowy',
      description: 'Porte-clés métal avec écusson émaillé.',
      descriptionPl: 'Metalowy brelok z emaliowanym herbem.',
      price: 9.99,
      currency: 'PLN',
      category: 'other',
      stock: 100,
      isAvailable: true
    },
    {
      name: 'Autocollant Logo',
      namePl: 'Naklejka z Logo',
      description: 'Autocollant résistant aux intempéries. 10x10cm.',
      descriptionPl: 'Naklejka odporna na warunki atmosferyczne. 10x10cm.',
      price: 4.99,
      currency: 'PLN',
      category: 'other',
      stock: 200,
      isAvailable: true
    }
  ];

  for (const productData of products) {
    const [product, created] = await Product.findOrCreate({
      where: { 
        name: productData.name
      },
      defaults: productData
    });
    
    if (created) {
      console.log(`   ✓ Created product: ${product.name}`);
    } else {
      console.log(`   - Product already exists: ${product.name}`);
    }
  }

  console.log('✅ Products seeded successfully\n');
};