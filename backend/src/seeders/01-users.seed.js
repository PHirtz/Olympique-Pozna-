import argon2 from 'argon2';
import User from '../models/user.model.js';

export const seedUsers = async () => {
  console.log('🌱 Seeding Users...');

  const hashedPassword = await argon2.hash('Password123!');

  const users = [
    {
      username: 'Owen',
      email: 's.wutezi@wutezi.com',
      password: hashedPassword,
      firstName: 'Stéphane',
      lastName: 'Wutezi',
      role: 'admin',
      isActive: true,
      preferredLanguage: 'fr',
      membershipStatus: 'active'
    },
    {
      username: 'coach_test',
      email: 'coach.test@olympiquepoznan.com',
      password: hashedPassword,
      firstName: 'Coach',
      lastName: 'Test',
      role: 'coach',
      phoneNumber: '+48 123 456 789',
      dateOfBirth: '1985-03-15',
      nationality: 'Polonaise',
      bio: 'Entraîneur principal avec 15 ans d\'expérience',
      isActive: true,
      preferredLanguage: 'pl',
      membershipStatus: 'active',
      membershipStartDate: '2020-01-01'
    },
    {
      username: 'player_test',
      email: 'player.test@olympiquepoznan.com',
      password: hashedPassword,
      firstName: 'Player',
      lastName: 'Test',
      role: 'player',
      phoneNumber: '+48 234 567 890',
      dateOfBirth: '2005-07-20',
      nationality: 'Polonaise',
      playerNumber: 10,
      position: 'Attaquant',
      bio: 'Jeune talent prometteur de l\'académie',
      isActive: true,
      preferredLanguage: 'pl',
      membershipStatus: 'active',
      membershipStartDate: '2018-09-01'
    },
    {
      username: 'member_test',
      email: 'member.test@olympiquepoznan.com',
      password: hashedPassword,
      firstName: 'Member',
      lastName: 'Test',
      role: 'member',
      phoneNumber: '+33 6 12 34 56 78',
      dateOfBirth: '1990-05-25',
      nationality: 'Française',
      bio: 'Membre actif et supportrice passionnée',
      isActive: true,
      preferredLanguage: 'fr',
      membershipStatus: 'active',
      membershipStartDate: '2021-03-10'
    }
  ];

  for (const userData of users) {
    const [user, created] = await User.findOrCreate({
      where: { email: userData.email },
      defaults: userData
    });
    
    if (created) {
      console.log(`   ✓ Created user: ${user.username}`);
    } else {
      console.log(`   - User already exists: ${user.username}`);
    }
  }

  console.log('✅ Users seeded successfully\n');
};