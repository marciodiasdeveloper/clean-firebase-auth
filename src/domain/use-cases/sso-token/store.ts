/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { GetEnviromentVariable, SendMailSSOToken, UUIDGenerator } from '@/domain/contracts'
import { UserShowByEmail, SSOTokenCreate, SSOTokenByUserIdShow, SSOTokenDelete } from '@/domain/contracts/repos'
import { MountUrl, SendMailError, TokenNotCreatedError } from '@/domain/entities'
import { NotFoundUserError } from '@/domain/entities/errors/user'

type Setup = (
  userRepo: UserShowByEmail,
  ssoTokenRepo: SSOTokenByUserIdShow & SSOTokenCreate & SSOTokenDelete,
  uuidGenerator: UUIDGenerator,
  mailMicroservice: SendMailSSOToken,
  enviromentGateway: GetEnviromentVariable
) => SSOTokenUseCase
type Input = { email: string, domain: string }
type Output = { success: boolean }
export type SSOTokenUseCase = (input: Input) => Promise<Output>

export const setupSendSSOTokenStore: Setup = (userRepo, ssoTokenRepo, uuidGenerator, mailMicroservice, enviromentGateway) => async input => {
  const user = await userRepo.showByEmail({
    email: input.email
  })

  if (user === undefined) {
    throw new NotFoundUserError()
  }

  let token = await ssoTokenRepo.showByUserId({
    userId: user.id
  })
  if (token !== undefined) {
    await ssoTokenRepo.delete({
      id: token.id
    })
  }

  token = await ssoTokenRepo.create({
    token: uuidGenerator.uuid({ key: 'user' }),
    createdAt: new Date(),
    userId: user.id
  })

  if (token === undefined) {
    throw new TokenNotCreatedError()
  }

  const enviroment = enviromentGateway.getEnviromentVariable().enviroment

  const mountedUrl = new MountUrl(input.domain, enviroment, `sso/${token?.token}`, user.language).mountUrl()

  const sendMailResult = await mailMicroservice.sendMailSSOToken({
    url: mountedUrl,
    userId: user.id,
    domain: input.domain,
    ...user
  })

  if (sendMailResult === undefined) {
    throw new SendMailError()
  }
  return {
    success: true
  }
}
