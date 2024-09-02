/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [`${__dirname}/../../**/*entity{.ts,.js}`],
  migrations: [`${__dirname}/../../../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));
