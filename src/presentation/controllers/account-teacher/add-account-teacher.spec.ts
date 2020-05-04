import { AddAccountTeacherModel } from '@/domain/models/account-teacher/add-account-teacher-model'
import { AddAccountTeacherParams } from '@/domain/usecases/account-teacher/add-account'

import { AddAccountTeacherRepository } from '../../../data/protocols/add-account-teacher-repository'
import {
  DuplicatedField,
  HttpRequest,
  Validation,
  AddAccountTeacherController,
  MissingParamError,
  InvalidParamError,
  DuplicatedFieldError,
  ok
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
    password: 'any_password'
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

const mockAddAccount = (): AddAccountTeacherRepository => {
  class AddAccountTeacher implements AddAccountTeacherRepository {
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
  addAccountTeacherStub: AddAccountTeacherRepository

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

  test('Espero que retorne 400 o campo email esteja em branco', async () => {
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

  test('Espero que retorne 400 o campo lattes esteja em branco', async () => {
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

  test('Espero que retorne 400 o campo cv esteja em branco', async () => {
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
