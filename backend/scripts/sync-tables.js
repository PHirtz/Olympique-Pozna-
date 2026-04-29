import dotenv from 'dotenv';
dotenv.config();

import db from '../database/db.js';
import '../models/associations.js';

await db.sync({ alter: true });
console.log('✅ Tables synchronisées');
process.exit(0);
