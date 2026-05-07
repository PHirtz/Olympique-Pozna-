import Team from '../models/team.model.js';
import User from '../models/user.model.js';

export const seedTeams = async () => {
  console.log('🌱 Seeding Teams...');

  // Récupérer l'entraîneur
  const coach = await User.findOne({ where: { username: 'coach_pierre' } });

  const teams = [
    {
      name: 'Olympique Poznan Seniors',
      namePl: 'Olympique Poznań Seniorzy',
      category: 'senior',
      gender: 'male',
      season: '2024-2025',
      description: 'L\'équipe première masculine évoluant en division régionale',
      descriptionPl: 'Pierwsza męska drużyna występująca w lidze regionalnej',
      coachId: coach?.id,
      isActive: true
    },
    {
      name: 'Olympique Poznan U19',
      namePl: 'Olympique Poznań U19',
      category: 'u19',
      gender: 'male',
      season: '2024-2025',
      description: 'Équipe des moins de 19 ans',
      descriptionPl: 'Drużyna do lat 19',
      isActive: true
    },
    {
      name: 'Olympique Poznan U17',
      namePl: 'Olympique Poznań U17',
      category: 'u17',
      gender: 'male',
      season: '2024-2025',
      description: 'Équipe des moins de 17 ans',
      descriptionPl: 'Drużyna do lat 17',
      isActive: true
    },
    {
      name: 'Olympique Poznan U15',
      namePl: 'Olympique Poznań U15',
      category: 'u15',
      gender: 'male',
      season: '2024-2025',
      description: 'Équipe des moins de 15 ans',
      descriptionPl: 'Drużyna do lat 15',
      isActive: true
    },
    {
      name: 'Olympique Poznan U13',
      namePl: 'Olympique Poznań U13',
      category: 'u13',
      gender: 'mixed',
      season: '2024-2025',
      description: 'Équipe mixte des moins de 13 ans',
      descriptionPl: 'Mieszana drużyna do lat 13',
      isActive: true
    }
  ];

  for (const teamData of teams) {
    const [team, created] = await Team.findOrCreate({
      where: { 
        name: teamData.name,
        season: teamData.season 
      },
      defaults: teamData
    });
    
    if (created) {
      console.log(`   ✓ Created team: ${team.name}`);
    } else {
      console.log(`   - Team already exists: ${team.name}`);
    }
  }

  console.log('✅ Teams seeded successfully\n');
};