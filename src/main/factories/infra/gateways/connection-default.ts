import { ConnectionDefault } from '@/infra/gateways'
import { env } from '@/main/config/env'

export const makeConnectionDefault = (): ConnectionDefault => {
  return new ConnectionDefault({
    type: env.database.type,
    host: env.database.host,
    port: env.database.port,
    username: env.database.username,
    password: env.database.password,
    database: env.database.database,
    environment: env.environment
  })
}
