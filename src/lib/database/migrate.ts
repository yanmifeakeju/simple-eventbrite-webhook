import { resolve } from 'node:path';
import { db } from './index.js';
import { migrate } from 'drizzle-orm/libsql/migrator';


await migrate(db, {
  migrationsFolder: resolve(import.meta.dirname, '../../../migrations')
});
