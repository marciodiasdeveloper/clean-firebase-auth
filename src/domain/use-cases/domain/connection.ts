import { GetDomainUrl } from '@/domain/entities'

type Setup = () => DomainUseCase
type Input = { host: string }
type Output = string

export type DomainUseCase = (input: Input) => Promise<Output>

export const setupDomainUseCase: Setup = () => async input => {
  return new GetDomainUrl(input.host).getDomain()
}
