import { ConnectionDefault } from '@/infra/gateways'

describe('ConnectionDefault', () => {
  const environment = {
    type: '',
    host: '',
    port: 10,
    username: '',
    password: '',
    database: '',
    enviroment: undefined
  }
  let sut: ConnectionDefault

  beforeEach(() => {
    sut = new ConnectionDefault(environment)
  })

  it('should validate getConnectionDefault', async () => {
    const encrpted = sut.getConnectionDefault({
      name: 'name'
    })

    expect(encrpted).toEqual({
      name: 'name',
      cli: {
        entitiesDir: '/app/src/infra/repos/postgres/entities',
        migrationsDir: '/app/src/infra/repos/postgres/migrations'
      },
      database: '',
      entities: [
        '/app/src/infra/repos/postgres/entities/index.{js,ts}',
        '/app/src/infra/repos/postgres/tenants/entities/index.{js,ts}'
      ],
      host: '',
      migrations: [
        '/app/src/infra/repos/postgres/migrations/**/*{.ts,.js}'
      ],
      password: '',
      port: 10,
      type: 'postgres',
      username: ''
    })
  })
  it('should validate getConnectionDefault production', async () => {
    const environment = {
      type: '',
      host: '',
      port: 10,
      username: '',
      password: '',
      database: '',
      environment: 'production'
    }
    sut = new ConnectionDefault(environment)

    const encrpted = sut.getConnectionDefault({
      name: 'name'
    })

    expect(encrpted).toEqual({
      name: 'name',
      cli: {
        entitiesDir: '/app/src/infra/repos/postgres/entities',
        migrationsDir: '/app/src/infra/repos/postgres/migrations'
      },
      database: '',
      entities: [
        '/app/src/infra/repos/postgres/entities/index.{js,ts}',
        '/app/src/infra/repos/postgres/tenants/entities/index.{js,ts}'
      ],
      host: '',
      migrations: [
        '/app/src/infra/repos/postgres/migrations/**/*{.ts,.js}'
      ],
      password: '',
      port: 10,
      type: 'postgres',
      username: ''
    })
  })
})
