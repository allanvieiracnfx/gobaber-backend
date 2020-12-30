import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {

  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {

    const user = await createUserService.execute({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Allan');
    expect(user.email).toBe('allancnfx.vieira@gmail.com');

  });

  it('should not be create a new user with same email from another', async () => {

    await createUserService.execute({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    await expect(
      createUserService.execute({
        name: 'Allan',
        email: 'allancnfx.vieira@gmail.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

});
