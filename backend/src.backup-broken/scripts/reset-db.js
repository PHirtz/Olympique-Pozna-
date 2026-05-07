import sequelize from '../config/database.js';

await sequelize.sync({ alter: false });
console.log('✅ Database reset!');
process.exit(0);