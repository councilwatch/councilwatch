import { join } from 'node:path';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const { parsed: parsedConfig, error: parsingError } = config({
  path: '.env.development',
});

if (parsingError || !parsedConfig) {
  console.error(parsingError);

  throw new Error('Failed to parse .env.development');
}

console.log(join(__dirname, 'common', 'migrations', '*.{ts,js}'));

const datasource = new DataSource({
  applicationName: 'CouncilWatchMigrator',
  type: 'postgres',
  url: parsedConfig.DATABASE_URL,
  entities: [join(__dirname, 'src', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'src', 'common', 'migrations', '*.{ts,js}')],
  logging: true,
});

export default datasource;
