import News from '../models/news.model.js';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';

export const seedNews = async () => {
  console.log('🌱 Seeding News...');

  const admin = await User.findOne({ where: { username: 'admin' } });
  const seniorTeam = await Team.findOne({ where: { category: 'senior' } });

  if (!admin) {
    console.log('   ⚠ No admin user found, skipping news');
    return;
  }

  const newsItems = [
    {
      title: 'Victoire écrasante contre FC Wrocław',
      titlePl: 'Miażdżące zwycięstwo nad FC Wrocław',
      slug: 'victoire-ecrasante-fc-wroclaw-2024',
      content: `Une performance exceptionnelle de nos joueurs qui ont su dominer le match de bout en bout. Lucas Nowak s'est illustré avec un magnifique triplé. L'équipe montre une forme olympique en cette fin d'année.
      
Le match a débuté sur les chapeaux de roues avec une ouverture du score dès la 8e minute. Notre défense solide n'a laissé aucune chance à l'adversaire.

Prochaine rencontre : Śląsk Wrocław II à domicile le 10 décembre.`,
      contentPl: `Wyjątkowy występ naszych zawodników, którzy dominowali mecz od pierwszej do ostatniej minuty. Lucas Nowak wyróżnił się wspaniałym hat-trickiem. Zespół jest w olimpijskiej formie pod koniec roku.
      
Mecz rozpoczął się w szybkim tempie z golem już w 8. minucie. Nasza solidna obrona nie dała żadnych szans przeciwnikowi.

Następny mecz: Śląsk Wrocław II u siebie 10 grudnia.`,
      excerpt: 'L\'Olympique Poznan s\'impose 3-1 à domicile avec un triplé de Lucas Nowak',
      excerptPl: 'Olympique Poznań wygrywa u siebie 3-1 z hat-trickiem Lucasa Nowaka',
      authorId: admin.id,
      teamId: seniorTeam?.id,
      category: 'match_report',
      status: 'published',
      publishedAt: new Date('2024-11-15T18:00:00Z'),
      isPinned: true
    },
    {
      title: 'Ouverture des inscriptions pour le stage d\'été 2025',
      titlePl: 'Rozpoczęcie zapisów na letni obóz 2025',
      slug: 'inscriptions-stage-ete-2025',
      content: `Nous sommes heureux d'annoncer l'ouverture des inscriptions pour notre stage d'été 2025 !

📅 Dates : Du 15 au 28 juillet 2025
📍 Lieu : Centre sportif de Zakopane
👥 Places limitées à 30 participants
🎯 Pour les jeunes de 8 à 16 ans

Au programme :
- Entraînements techniques quotidiens
- Matchs amicaux
- Activités de cohésion d'équipe
- Excursions en montagne

Prix : 850 PLN (comprenant hébergement, repas, et activités)

Les inscriptions sont ouvertes dès maintenant sur notre site web.`,
      contentPl: `Z przyjemnością ogłaszamy rozpoczęcie zapisów na nasz letni obóz 2025!

📅 Daty: Od 15 do 28 lipca 2025
📍 Miejsce: Ośrodek sportowy w Zakopanem
👥 Ograniczona liczba miejsc do 30 uczestników
🎯 Dla młodzieży w wieku 8-16 lat

Program:
- Codzienne treningi techniczne
- Mecze towarzyskie
- Zajęcia integracyjne
- Wycieczki górskie

Cena: 850 PLN (zakwaterowanie, wyżywienie i zajęcia wliczone)

Zapisy są już otwarte na naszej stronie internetowej.`,
      excerpt: 'Stage d\'été 2025 à Zakopane : inscriptions ouvertes !',
      excerptPl: 'Letni obóz 2025 w Zakopanem: zapisy otwarte!',
      authorId: admin.id,
      category: 'announcement',
      status: 'published',
      publishedAt: new Date('2024-11-20T10:00:00Z'),
      isPinned: true
    },
    {
      title: 'Match nul spectaculaire face à Polonia',
      titlePl: 'Spektakularny remis z Polonią',
      slug: 'match-nul-polonia-2024',
      content: `Un match palpitant qui a tenu nos supporters en haleine jusqu'à la dernière minute ! Menés 2-1 à la 88e minute, nos joueurs ont montré un mental d'acier avec un but égalisateur d'Adam Wiśniewski dans les arrêts de jeu.

Le match :
- 0-1 (25') : Polonia ouvre le score sur coup franc
- 1-1 (42') : Lucas Nowak égalise juste avant la mi-temps
- 1-2 (67') : Polonia reprend l'avantage
- 2-2 (89') : Adam Wiśniewski sauve le point !

Cette rencontre confirme la belle dynamique de l'équipe.`,
      contentPl: `Pasjonujący mecz, który trzymał naszych kibiców w napięciu do ostatniej minuty! Przegrywając 2-1 w 88. minucie, nasi zawodnicy pokazali stalową mentalność z bramką wyrównującą Adama Wiśniewskiego w doliczonym czasie gry.

Przebieg meczu:
- 0-1 (25'): Polonia otwiera wynik z rzutu wolnego
- 1-1 (42'): Lucas Nowak wyrównuje tuż przed przerwą
- 1-2 (67'): Polonia ponownie wychodzi na prowadzenie
- 2-2 (89'): Adam Wiśniewski ratuje punkt!

Ten mecz potwierdza dobrą dynamikę zespołu.`,
      excerpt: 'But égalisateur à la 89e : Polonia 2-2 Olympique Poznan',
      excerptPl: 'Bramka wyrównująca w 89. minucie: Polonia 2-2 Olympique Poznań',
      authorId: admin.id,
      teamId: seniorTeam?.id,
      category: 'match_report',
      status: 'published',
      publishedAt: new Date('2024-11-29T19:00:00Z'),
      isPinned: false
    },
    {
      title: 'Nouveau partenariat avec SportTech',
      titlePl: 'Nowe partnerstwo ze SportTech',
      slug: 'partenariat-sporttech-2024',
      content: `L'Olympique Poznan est fier d'annoncer un nouveau partenariat avec SportTech, leader en équipement sportif.

Ce partenariat apportera :
- Des maillots et équipements de dernière génération
- Un soutien financier pour nos équipes de jeunes
- Des stages de formation pour nos coachs

Bienvenue à notre nouveau partenaire !`,
      contentPl: `Olympique Poznań z dumą ogłasza nowe partnerstwo ze SportTech, liderem w sprzęcie sportowym.

To partnerstwo przyniesie:
- Koszulki i sprzęt najnowszej generacji
- Wsparcie finansowe dla naszych drużyn młodzieżowych
- Szkolenia dla naszych trenerów

Witamy naszego nowego partnera!`,
      excerpt: 'Partenariat stratégique avec SportTech',
      excerptPl: 'Strategiczne partnerstwo ze SportTech',
      authorId: admin.id,
      category: 'announcement',
      status: 'published',
      publishedAt: new Date('2024-11-25T14:00:00Z'),
      isPinned: false
    },
    {
      title: 'Calendrier des matchs de décembre',
      titlePl: 'Kalendarz meczów grudniowych',
      slug: 'calendrier-decembre-2024',
      content: `Découvrez le calendrier complet de nos matchs pour le mois de décembre :

🏆 Seniors :
- 10/12 : Śląsk Wrocław II (Domicile) - 15h00
- 17/12 : Zagłębie Lubin B (Extérieur) - 14h00

⚽ U19 :
- 05/12 : Lech Poznań U19 (Domicile) - 14h00
- 12/12 : Warta Poznań U19 (Extérieur) - 13h30

Venez nombreux supporter nos équipes !`,
      contentPl: `Poznaj pełny kalendarz naszych meczów na grudzień:

🏆 Seniorzy:
- 10/12: Śląsk Wrocław II (U siebie) - 15:00
- 17/12: Zagłębie Lubin B (Na wyjeździe) - 14:00

⚽ U19:
- 05/12: Lech Poznań U19 (U siebie) - 14:00
- 12/12: Warta Poznań U19 (Na wyjeździe) - 13:30

Przyjdźcie licznie kibicować naszym zespołom!`,
      excerpt: 'Tous nos matchs de décembre 2024',
      excerptPl: 'Wszystkie nasze mecze w grudniu 2024',
      authorId: admin.id,
      category: 'event',
      status: 'published',
      publishedAt: new Date('2024-12-01T09:00:00Z'),
      isPinned: false
    }
  ];

  for (const newsData of newsItems) {
    const [news, created] = await News.findOrCreate({
      where: { slug: newsData.slug },
      defaults: newsData
    });
    
    if (created) {
      console.log(`   ✓ Created news: ${news.title}`);
    } else {
      console.log(`   - News already exists: ${news.title}`);
    }
  }

  console.log('✅ News seeded successfully\n');
};