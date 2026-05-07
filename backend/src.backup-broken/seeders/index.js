import dotenv from 'dotenv';
import db from '../database/db.js';
import '../models/associations.js';

// Import seeders
import { seedUsers } from './01-users.seed.js';
import { seedTeams } from './02-teams.seed.js';
import { seedMatches } from './03-matches.seed.js';
import { seedNews } from './04-news.seed.js';
import { seedCamps } from './05-camps.seed.js';
import { seedProducts } from './06-products.seed.js';
import { seedPartners } from './07-partners.seed.js';

// Load environment variables
dotenv.config();

const runSeeders = async () => {
  try {
    console.log('\n🌱 Starting database seeding...\n');
    console.log('='.repeat(50));
    
    // Test database connection
    await db.authenticate();
    console.log('✅ Database connection established\n');

    // Sync database (create tables if they don't exist)
    await db.sync();
    console.log('✅ Database synchronized\n');

    console.log('='.repeat(50));
    console.log('\n');

    // Run seeders in order (respecting foreign key constraints)
    await seedUsers();
    await seedTeams();
    await seedMatches();
    await seedNews();
    await seedCamps();
    await seedProducts();
    await seedPartners();

    console.log('='.repeat(50));
    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log('  ✓ Users seeded');
    console.log('  ✓ Teams seeded');
    console.log('  ✓ Matches seeded');
    console.log('  ✓ News seeded');
    console.log('  ✓ Camps seeded');
    console.log('  ✓ Products seeded');
    console.log('  ✓ Partners seeded');
    console.log('\n📊 You can now test your API endpoints!\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    process.exit(1);
  }
};

// Run seeders
runSeeders();