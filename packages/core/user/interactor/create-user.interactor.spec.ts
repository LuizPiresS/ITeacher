import { Presenter } from '../../presenter';
import { Validator } from '../../validator';
import {
  UserNameInvalidError,
  UserCPFInvalidError,
  UserBirthdateInvalidError,
  UserCellphoneInvalidError,
  UserEmailInvalidError,
} from '../errors';
import { UserRepository } from '../user.repository';
import {
  CreateUserInteractor,
  CreateUserResponse,
  CreateUserRequest,
} from './create-user.interactor';

const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn(),
};

const userRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const validationMock = {
  isEmail: jest.fn(),
  isCPF: jest.fn(),
  isPassword: jest.fn(),
  isDate: jest.fn(),
  isCellphone: jest.fn(),
};

describe('CreateUser Interactor', () => {
  let interactor: CreateUserInteractor;

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
      validationMock as Validator,
    );
  });

  beforeEach(() => {
    validationMock.isCPF.mockReturnValue(true);
    validationMock.isCellphone.mockReturnValue(true);
    validationMock.isDate.mockReturnValue(true);
    validationMock.isEmail.mockReturnValue(true);
  });

  test('Espero um throw caso o name seja inválido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: '',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserNameInvalidError('invalid name'),
    );
  });

  test('Espero um throw caso o cpf seja invalido', async () => {
    const interactorStub = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
      validationMock as Validator,
    );
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: '',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    validationMock.isCPF.mockReturnValue(false);

    await interactorStub.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserCPFInvalidError('invalid cpf'),
    );
  });

  test('Espero um throw caso o birthdate seja invalido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'invalid_date',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    validationMock.isDate.mockReturnValue(false);

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserBirthdateInvalidError('invalid birthdate'),
    );
  });

  test('Espero um throw caso o cellphone seja invalido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'invalid_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    validationMock.isCellphone.mockReturnValue(false);
    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserCellphoneInvalidError('invalid cellphone'),
    );
  });

  test('Espero um throw caso o email seja invalido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'invalid_email',
      password: 'any_password',
    };

    validationMock.isEmail.mockReturnValue(false);
    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserEmailInvalidError('invalid e-mail'),
    );
  });
}); // Fim describe