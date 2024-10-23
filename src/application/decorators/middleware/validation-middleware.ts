// import { Middleware } from '@/application/middlewares'
// import { badRequest, HttpResponse } from '@/application/helpers'
// import { Validator } from '@/domain/contracts/gateways'
// import { Validators } from '@/infra/gateways'

// export class ValidationMiddleware extends Middleware {
//   constructor (
//     private readonly decoratee: Middleware,
//     private readonly validators: Validators
//   ) {
//     super()
//   }

//   override buildValidators (httpRequest: Record<string, unknown>): Validator[] {
//     return this.decoratee.buildValidators(httpRequest)
//   }

//   async perform (httpRequest: Record<string, unknown>): Promise<HttpResponse> {
//     const error = this.validate(httpRequest)
//     if (error !== undefined) return badRequest(error)
//     return await this.decoratee.perform(httpRequest)
//   }

//   private validate (httpRequest: Record<string, unknown>): Error | undefined {
//     const validators = this.buildValidators(httpRequest)

//     return this.validators.compositeValidator({ validators }).validate()
//   }
// }
