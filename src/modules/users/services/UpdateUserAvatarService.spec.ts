import FakekStoregeProvider from '@shared/container/providers/StoregeProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {

  let fakeUsersRepository: FakeUsersRepository;
  let fakekStoregeProvider: FakekStoregeProvider;
  let updateUserAvatarService: UpdateUserAvatarService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakekStoregeProvider = new FakekStoregeProvider();
    updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakekStoregeProvider);
  });

  it('should be able to create a new user', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'example@example.com',
      password: '1234'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    });

    expect(user.avatar).toBe('avatar.png');

  });

  it('should be able to update avatar from non existing user', async () => {

    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.png'
      })).rejects.toBeInstanceOf(AppError);

  });

  it('should delete old avatar when updating new one', async () => {

    const deleteFile = jest.spyOn(fakekStoregeProvider, 'deleteFile');
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakekStoregeProvider);

    const user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'example@example.com',
      password: '1234'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png')

    expect(user.avatar).toBe('avatar2.png');

  });

});
