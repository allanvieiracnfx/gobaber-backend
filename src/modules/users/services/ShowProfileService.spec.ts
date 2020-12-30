import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

describe('ShowProfile', () => {

  let fakeUsersRepository: FakeUsersRepository;
  let showProfileService: ShowProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Allan',
      email: 'allancnfx.vieira@gmail.com',
      password: '12345678'
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Allan');
    expect(profile.email).toBe('allancnfx.vieira@gmail.com');

  });

  it('should not be able to show the profile from non-existing user', async () => {

    expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      })
    ).rejects.toBeInstanceOf(AppError);

  });

});
