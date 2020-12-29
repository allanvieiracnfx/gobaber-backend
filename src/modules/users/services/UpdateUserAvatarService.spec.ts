import FakekStoregeProvider from '@shared/container/providers/StoregeProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {

  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakekStoregeProvider = new FakekStoregeProvider();
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

    expect(user.avatar).toBe('avatar.png');

  });

  it('should be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakekStoregeProvider = new FakekStoregeProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakekStoregeProvider);


    expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.png'
      })).rejects.toBeInstanceOf(AppError);

  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakekStoregeProvider = new FakekStoregeProvider();

    const deleteFile = jest.spyOn(fakekStoregeProvider, 'deleteFile' );

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
