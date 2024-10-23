export interface GetConnectionDefault {
  getConnectionDefault: (input: GetConnectionDefault.Input) => GetConnectionDefault.Output
}

export namespace GetConnectionDefault {
  export type Input = {
    name: string
  }
  export type Output = {
    name: string
    type: string
    host: string
    port: number
    username: string
    password: string
    database: string
    entities: string[]
    migrations: string[]
    cli: Cli
  }
}

interface Cli {
  entitiesDir: string
  migrationsDir: string
}
