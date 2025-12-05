import Match from '../models/match.model.js';
import Team from '../models/team.model.js';

export const seedMatches = async () => {
  console.log('🌱 Seeding Matches...');

  const seniorTeam = await Team.findOne({ where: { category: 'senior' } });
  const u19Team = await Team.findOne({ where: { category: 'u19' } });

  if (!seniorTeam) {
    console.log('   ⚠ No senior team found, skipping matches');
    return;
  }

  const matches = [
    // Matchs passés (Seniors)
    {
      teamId: seniorTeam.id,
      opponentName: 'FC Wrocław',
      matchDate: new Date('2024-11-15T15:00:00Z'),
      location: 'Stade Municipal de Poznań',
      isHome: true,
      competition: 'Championnat Régional',
      status: 'finished',
      scoreHome: 3,
      scoreAway: 1,
      matchReport: 'Belle victoire à domicile avec un triplé de Lucas Nowak.',
      matchReportPl: 'Piękne zwycięstwo u siebie z hat-trickiem Lucasa Nowaka.'
    },
    {
      teamId: seniorTeam.id,
      opponentName: 'Lech Poznań B',
      matchDate: new Date('2024-11-22T14:00:00Z'),
      location: 'Stade Lech Poznań',
      isHome: false,
      competition: 'Coupe de Pologne',
      status: 'finished',
      scoreHome: 1,
      scoreAway: 2,
      matchReport: 'Défaite honorable face à l\'équipe réserve du Lech.',
      matchReportPl: 'Honorowa porażka z drużyną rezerwową Lecha.'
    },
    {
      teamId: seniorTeam.id,
      opponentName: 'Polonia Warszawa',
      matchDate: new Date('2024-11-29T16:00:00Z'),
      location: 'Stade Municipal de Poznań',
      isHome: true,
      competition: 'Championnat Régional',
      status: 'finished',
      scoreHome: 2,
      scoreAway: 2,
      matchReport: 'Match nul spectaculaire avec un but égalisateur à la 89e minute.',
      matchReportPl: 'Spektakularny remis z bramką wyrównującą w 89. minucie.'
    },
    // Matchs à venir (Seniors)
    {
      teamId: seniorTeam.id,
      opponentName: 'Śląsk Wrocław II',
      matchDate: new Date('2024-12-10T15:00:00Z'),
      location: 'Stade Municipal de Poznań',
      isHome: true,
      competition: 'Championnat Régional',
      status: 'scheduled'
    },
    {
      teamId: seniorTeam.id,
      opponentName: 'Zagłębie Lubin B',
      matchDate: new Date('2024-12-17T14:00:00Z'),
      location: 'Stade Zagłębie',
      isHome: false,
      competition: 'Championnat Régional',
      status: 'scheduled'
    },
    {
      teamId: seniorTeam.id,
      opponentName: 'Wisła Płock',
      matchDate: new Date('2025-01-07T15:30:00Z'),
      location: 'Stade Municipal de Poznań',
      isHome: true,
      competition: 'Coupe de Pologne',
      status: 'scheduled'
    }
  ];

  // Matchs U19
  if (u19Team) {
    matches.push(
      {
        teamId: u19Team.id,
        opponentName: 'Lech Poznań U19',
        matchDate: new Date('2024-12-05T14:00:00Z'),
        location: 'Centre d\'entraînement Olympique',
        isHome: true,
        competition: 'Championnat U19',
        status: 'scheduled'
      },
      {
        teamId: u19Team.id,
        opponentName: 'Warta Poznań U19',
        matchDate: new Date('2024-12-12T13:30:00Z'),
        location: 'Stade Warta',
        isHome: false,
        competition: 'Championnat U19',
        status: 'scheduled'
      }
    );
  }

  for (const matchData of matches) {
    const [match, created] = await Match.findOrCreate({
      where: { 
        teamId: matchData.teamId,
        opponentName: matchData.opponentName,
        matchDate: matchData.matchDate
      },
      defaults: matchData
    });
    
    if (created) {
      console.log(`   ✓ Created match: ${match.opponentName} (${match.matchDate.toLocaleDateString()})`);
    } else {
      console.log(`   - Match already exists: ${match.opponentName}`);
    }
  }

  console.log('✅ Matches seeded successfully\n');
};