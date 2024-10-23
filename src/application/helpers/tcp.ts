import { ForbiddenError, NotFoundError, ServerError, UnauthorizedError } from '@/application/errors'

export type TcpResponse<T = any> = {
  data?: T
}

export const tcpOk = <T = any> (data: T): TcpResponse<T> => ({
  data
})

export const tcpNoContent = (): TcpResponse => ({})

export const tcpBadRequest = (error: Error): TcpResponse<Error> => ({
  data: error
})

export const tcpUnauthorized = (): TcpResponse<Error> => ({
  data: new UnauthorizedError()
})

export const tcpForbidden = (): TcpResponse<Error> => ({
  data: new ForbiddenError()
})

export const tcpServerError = (error: unknown): TcpResponse<Error> => ({
  data: new ServerError(error instanceof Error ? error : undefined)
})

export const tcpNotFound = (error?: Error): TcpResponse<Error> => ({
  data: error ?? new NotFoundError()
})
