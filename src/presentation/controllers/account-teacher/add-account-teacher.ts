import { badRequest } from '../../adapters/http-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'

export class AddAccountTeacherController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.cpf) {
      return badRequest(new MissingParamError('cpf'))
    }
    // sucesso
    return {
      statusCode: 200
    }
  }
}
