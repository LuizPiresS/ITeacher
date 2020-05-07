import { AddAccountTeacherModel } from '@/domain/models/account-teacher/add-account-teacher-model'

import { serverError } from '../../adapters/http-error'
import {
  DuplicatedField,
  HttpRequest,
  Validation,
  AddAccountTeacher,
  MissingParamError,
  InvalidParamError,
  DuplicatedFieldError,
  ok,
  AddAccountTeacherParams,
  AddAccountTeacherController
} from './add-account-protocols'

const mockDuplicatedField = (): DuplicatedField => {
  class DuplicatedFieldStub implements DuplicatedField {
    async isDuplicated (field: string): Promise<boolean> {
      return Promise.resolve(false)
    }
  }
  return new DuplicatedFieldStub()
}

const mockHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    cpf: 'any_cpf',
    birthDate: 'any_birthDate',
    email: 'any_mail@mail.com',
    cellphone: 'any_cellphone',
    whatsApp: 'any_whatsApp',
    photo: 'any_photo',
    lattes: 'any_lattes',
    cv: 'any_cv',
    about: 'any_about',
    password: 'any_password'
  }
})

const mockAddAcountModel = (): AddAccountTeacherModel => (
  {
    id: 1,
    name: 'any_name',
    cpf: 'any_cpf',
    birthDate: 'any_birthDate',
    email: 'any_mail@mail.com',
    cellphone: 'any_cellphone',
    whatsApp: 'any_whatsApp',
    photo: 'any_photo',
    lattes: 'any_lattes',
    cv: 'any_cv',
    about: 'any_about',
    password: 'any_password',
    token: 'any_token'
  }
)

const mockValidationEmail = (): Validation => {
  class ValidationEmailStub implements Validation {
    public validate (input: string): boolean {
      return true
    }
  }

  return new ValidationEmailStub()
}

const mockValidationCpf = (): Validation => {
  class ValidationCpfStub implements Validation {
    public validate (input: string): boolean {
      return true
    }
  }

  return new ValidationCpfStub()
}
const mockAddAccount = (): AddAccountTeacher => {
  class AddAccountTeacher implements AddAccountTeacher {
    async add (account: AddAccountTeacherParams): Promise<AddAccountTeacherModel> {
      return Promise.resolve(mockAddAcountModel())
    }
  }
  return new AddAccountTeacher()
}
type SutTypes = {
  sut: AddAccountTeacherController
  validationEmailStub: Validation
  validationCpfStub: Validation
  duplicatedFieldStub: DuplicatedField
  addAccountTeacherStub: AddAccountTeacher
}
const makeSut = (): SutTypes => {
  const validationEmailStub = mockValidationEmail()
  const validationCpfStub = mockValidationCpf()
  const duplicatedFieldStub = mockDuplicatedField()
  const addAccountTeacherStub = mockAddAccount()
  const sut = new AddAccountTeacherController(
    validationEmailStub,
    validationCpfStub,
    duplicatedFieldStub,
    addAccountTeacherStub
  )
  return {
    sut,
    validationEmailStub,
    validationCpfStub,
    duplicatedFieldStub,
    addAccountTeacherStub
  }
}

describe('AddAccountTeacher Controller', () => {
  test('Espero que retorne 400 o campo name esteja em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: 'any_cpf',
        birthDate: 'any_birthDate',
        email: 'any_mail@mail.com',
        cellphone: 'any_cellphone',
        whatsApp: 'any_whatsApp',
        photo: 'any_photo',
        lattes: 'any_lattes',
        cv: 'any_cv',
        about: 'any_about',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Espero que retorne 400 o campo cpf esteja em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        birthDate: 'any_birthDate',
        email: 'any_mail@mail.com',
        cellphone: 'any_cellphone',
        whatsApp: 'any_whatsApp',
        photo: 'any_photo',
        lattes: 'any_lattes',
        cv: 'any_cv',
        about: 'any_about',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
  })

  test('Espero que retorne 400 o campo email estiver em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        birthDate: 'any_birthDate',
        cpf: 'any_cpf',
        cellphone: 'any_cellphone',
        whatsApp: 'any_whatsApp',
        photo: 'any_photo',
        lattes: 'any_lattes',
        cv: 'any_cv',
        about: 'any_about',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Espero que retorne 400 se campo password estiver em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        birthDate: 'any_birthDate',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
        cellphone: 'any_cellphone',
        whatsApp: 'any_whatsApp',
        photo: 'any_photo',
        lattes: 'any_lattes',
        cv: 'any_cv',
        about: 'any_about'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Espero que retorne 400 o campo lattes estiver em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        birthDate: 'any_birthDate',
        email: 'any_email@mail.com',
        cpf: 'any_cpf',
        cellphone: 'any_cellphone',
        whatsApp: 'any_whatsApp',
        photo: 'any_photo',
        cv: 'any_cv',
        about: 'any_about',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('lattes'))
  })

  test('Espero que retorne 400 o campo cv estiver em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        birthDate: 'any_birthDate',
        email: 'any_email@mail.com',
        cpf: 'any_cpf',
        cellphone: 'any_cellphone',
        whatsApp: 'any_whatsApp',
        photo: 'any_photo',
        lattes: 'any_lattes',
        about: 'any_about',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cv'))
  })

  test('Espero que retorne 400 se  o email for invalido', async () => {
    const { sut, validationEmailStub } = makeSut()

    jest.spyOn(validationEmailStub, 'validate').mockReturnValueOnce(false)
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Espero que retorne 500 caso EmailValidator retorne uma excpetion', async () => {
    const mockValidationEmail = (): Validation => {
      class ValidationEmailStub implements Validation {
        public validate (input: string): boolean {
          throw new Error()
        }
      }

      return new ValidationEmailStub()
    }

    const sut = new AddAccountTeacherController(mockValidationEmail(), mockValidationCpf(), mockDuplicatedField(), mockAddAccount())

    jest.spyOn(mockValidationEmail(), 'validate')
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Espero que EmailValidator seja chamado com o email correto', async () => {
    const { sut, validationEmailStub } = makeSut()

    const emailValidatorSpy = jest.spyOn(validationEmailStub, 'validate')
    const httpRequest = mockHttpRequest()
    await sut.handle(httpRequest)

    expect(emailValidatorSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Espero que CPFValidator seja chamado com o cpf correto', async () => {
    const { sut, validationCpfStub } = makeSut()

    const emailValidatorSpy = jest.spyOn(validationCpfStub, 'validate')
    const httpRequest = mockHttpRequest()
    await sut.handle(httpRequest)

    expect(emailValidatorSpy).toHaveBeenCalledWith(httpRequest.body.cpf)
  })

  test('Espero que retorne 500 caso CPFValidator retorne uma excpetion', async () => {
    const mockValidationCPF = (): Validation => {
      class ValidationCPFStub implements Validation {
        public validate (input: string): boolean {
          throw new Error()
        }
      }

      return new ValidationCPFStub()
    }

    const sut = new AddAccountTeacherController(mockValidationEmail(), mockValidationCPF(), mockDuplicatedField(), mockAddAccount())

    jest.spyOn(mockValidationEmail(), 'validate')
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Espero que retorne 400 se o cpf for invalido', async () => {
    const { sut, validationCpfStub } = makeSut()

    jest.spyOn(validationCpfStub, 'validate').mockReturnValueOnce(false)
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf'))
  })

  test('Espero que retorne 400 se o email já estiver em uso', async () => {
    const { sut, duplicatedFieldStub } = makeSut()

    jest.spyOn(duplicatedFieldStub, 'isDuplicated').mockReturnValueOnce(Promise.resolve(true))
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new DuplicatedFieldError('cpf'))
  })

  test('Espero que retorne 200 se todos os dados forem validos', async () => {
    const { sut } = makeSut()

    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(httpResponse.body))
  })
}) // Final teste
