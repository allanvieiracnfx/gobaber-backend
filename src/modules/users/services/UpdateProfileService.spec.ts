import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateProfile', () => {

  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfileService: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon',
      email: 'jhon@gobaber.com.br',
    });

    expect(updatedUser.name).toBe('Jhon');
    expect(updatedUser.email).toBe('jhon@gobaber.com.br');

  });

  it('should not be able to update the profile from non-existing user', async () => {

    expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'Jhon',
        email: 'jhon@gobaber.com.br',
        old_password: 'wron-old-password',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'Teste-1',
      email: 'example1@gmail.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste-2',
      email: 'example2@gmail.com',
      password: '124'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Teste-1',
        email: 'example1@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should be able to update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon',
      email: 'jhon@gobaber.com.br',
      old_password: '12345678',
      password: '123',
    });

    expect(updatedUser.password).toBe('123');

  });

  it('should not be able to update the password without old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon',
        email: 'jhon@gobaber.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to update the password with wrong old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon',
        email: 'jhon@gobaber.com.br',
        old_password: 'wron-old-password',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

});
