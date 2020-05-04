import { badRequest, duplicatedFieldError, serverError } from '../../adapters/http-error'
import {
  Validation,
  DuplicatedField,
  HttpRequest,
  HttpResponse,
  MissingParamError,
  InvalidParamError,
  DuplicatedFieldError,
  Controller
} from './add-account-protocols'

export class AddAccountTeacherController implements Controller {
  constructor (
    private readonly validationEmail: Validation,
    private readonly validationCpf: Validation,
    private readonly duplicatedField: DuplicatedField
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'cpf', 'email', 'lattes', 'cv']

      for (const fieldName of requiredFields) {
        if (!httpRequest.body[fieldName]) {
          return badRequest(new MissingParamError(fieldName))
        }
      }

      const isValidEmail = this.validationEmail.validate(httpRequest.body.email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const isValidCpf = this.validationCpf.validate(httpRequest.body.cpf)
      if (!isValidCpf) {
        return badRequest(new InvalidParamError('cpf'))
      }

      const isDuplicated = await this.duplicatedField.isDuplicated('cpf')
      if (isDuplicated) {
        return duplicatedFieldError(new DuplicatedFieldError('cpf'))
      }

      // sucesso
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
