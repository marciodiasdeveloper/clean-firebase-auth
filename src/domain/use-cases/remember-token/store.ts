/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  GetEnvironment,
  MicroserviceEventsSendEvent,
  SendMailForgotPassword,
  TenantConnectionName,
  UUIDGenerator
} from '@/domain/contracts'
import {
  UserShowByEmail,
  RememberTokenCreate,
  RememberTokenByUserIdShow,
  RememberTokenDelete
} from '@/domain/contracts/repos'
import {
  MountUrl,
  SendMailError,
  TokenNotCreatedError
} from '@/domain/entities'
import { NotFoundUserError } from '@/domain/entities/errors/user'

type Setup = (
  userRepo: UserShowByEmail,
  rememberTokenRepo: RememberTokenByUserIdShow &
  RememberTokenCreate &
  RememberTokenDelete,
  uuidGenerator: UUIDGenerator,
  mailMicroservice: SendMailForgotPassword,
  getEnvironment: GetEnvironment,
  microserviceEvents: MicroserviceEventsSendEvent
) => StoreRememberTokenUseCase
type Input = { email: string, domain: string } & TenantConnectionName
type Output = { success: boolean }
export type StoreRememberTokenUseCase = (input: Input) => Promise<Output>

export const setupRememberTokenStore: Setup =
  (
    userRepo,
    rememberTokenRepo,
    uuidGenerator,
    mailMicroservice,
    getEnvironment,
    microserviceEvents
  ) =>
    async (input) => {
      const user = await userRepo.showByEmail({
        email: input.email,
        tenantConnectionName: input.tenantConnectionName
      })

      if (user === undefined) {
        throw new NotFoundUserError()
      }

      let token = await rememberTokenRepo.showByUserId({
        userId: user.id,
        tenantConnectionName: input.tenantConnectionName
      })
      if (token !== undefined) {
        await rememberTokenRepo.delete({
          id: token.id,
          tenantConnectionName: input.tenantConnectionName
        })
      }

      const tokenGenerated = uuidGenerator.uuid()

      const environment = getEnvironment.getEnvironment()

      const mountedUrl = new MountUrl(
        input.domain,
        environment,
      `forgot-password/${tokenGenerated}/new-password`,
      user.lang
      )

      const sendMailResult = await mailMicroservice.sendMailForgotPassword({
        url: mountedUrl.mountUrl(),
        userId: user.id,
        domain: input.domain,
        email: user.email
      })

      if (sendMailResult === undefined) {
        throw new SendMailError()
      }

      token = await rememberTokenRepo.create({
        token: tokenGenerated,
        createdAt: new Date(),
        userId: user.id,
        tenantConnectionName: input.tenantConnectionName
      })

      if (token === undefined) {
        throw new TokenNotCreatedError()
      }

      await microserviceEvents.dispatchSendEvent({
        domain: input.domain,
        slug: 'auth.forgot-password.token',
        userId: token.userId,
        lang: 'en'
      })

      return {
        success: true
      }
    }
