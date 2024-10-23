import { GetConnectionDefault } from '@/domain/contracts/gateways'

export interface DatabaseEnviroment {
  type: string
  host: string
  port: number
  username: string
  password: string
  database: string
  logging?: boolean
}

export class ConnectionDefault implements GetConnectionDefault {
  constructor (
    private readonly env: DatabaseEnviroment
  ){}

  getConnectionDefault (input: GetConnectionDefault.Input): GetConnectionDefault.Output{
    return {
      name: input.name,
      type: 'postgres',
      host: this.env.host,
      port: this.env.port,
      username: this.env.username,
      password: this.env.password,
      database: this.env.database,
      entities: [
    `${process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development' ? 'src' : '/app/src'}/infra/repos/postgres/entities/index.{js,ts}`,
    `${process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development' ? 'src' : '/app/src'}/infra/repos/postgres/tenants/entities/index.{js,ts}`
      ],
      migrations: [
    `${process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development' ? 'src' : '/app/src'}/infra/repos/postgres/migrations/**/*{.ts,.js}`
      ],
      cli: {
        entitiesDir: `${process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development' ? 'src' : '/app/src'}/infra/repos/postgres/entities`,
        migrationsDir: `${process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development' ? 'src' : '/app/src'}/infra/repos/postgres/migrations`
      }
    }
  }
}
