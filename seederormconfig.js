module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsTableName: process.env.MULTI_TENANCY_SEEDERS_TABLE,
  entities: ['src/infra/repos/postgres/entities/index.{js,ts}'],
  migrations: ['src/infra/repos/postgres/seeder/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/infra/repos/postgres/entities',
    migrationsDir: 'src/infra/repos/postgres/seeder'
  }
}
