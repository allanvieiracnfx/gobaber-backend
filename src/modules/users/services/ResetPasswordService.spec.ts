import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let resetPasswordService: ResetPasswordService;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });

  it('should be able to reset password', async () => {

    let user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'example@example.com',
      password: '1234',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      token,
      password: '7777',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('7777');
    expect(updatedUser?.password).toBe('7777');

  });

  it('should not be able to reset the password with non-existing token', async () => {

    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset the password with non-existing user', async () => {

    const { token } = await fakeUserTokensRepository.generate('non-existing-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset password if passed more then 2 h', async () => {

    let user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'example@example.com',
      password: '1234',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await
      expect(
        resetPasswordService.execute({
          token,
          password: '7777',
        })
      ).rejects.toBeInstanceOf(AppError);

  });

});
