import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {

  it('should be able to authenticate', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);


    const user = await createUserService.excute({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    const response = await authenticateUserService.execute({
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });


  it('should not be able to authenticate with non existing user', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(
      authenticateUserService.execute({
        email: 'allancnfx.vieira@gmail.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);


    await createUserService.excute({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    expect(
      authenticateUserService.execute({
        email: 'allancnfx.vieira@gmail.com',
        password: 'wrong-password'
      })).rejects.toBeInstanceOf(AppError);

  });


});
