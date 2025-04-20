import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../config/database.config';

const runMigrations = async () => {
  const umzug = new Umzug({
    migrations: {
      glob: 'src/db/migrations/*.ts',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
  console.log('✅ All migrations performed successfully');
};

runMigrations().catch((err) => {
  console.error('❌ Migration failed', err);
  process.exit(1);
});
