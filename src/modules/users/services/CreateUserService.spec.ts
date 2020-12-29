import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {

  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.excute({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Allan');
    expect(user.email).toBe('allancnfx.vieira@gmail.com');

  });

  it('should not be create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUserService.excute({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    expect(
      createUserService.excute({
        name: 'Allan',
        email: 'allancnfx.vieira@gmail.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError);

  });



});
