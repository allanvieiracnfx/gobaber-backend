import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRedisCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';
import ListProvidersService from './ListProvidersService';

describe('ListProviders', () => {

  let fakeUsersRepository: FakeUsersRepository;
  let listProvidersService: ListProvidersService;
  let fakeRedisCacheProvider: FakeRedisCacheProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRedisCacheProvider = new FakeRedisCacheProvider();
    listProvidersService = new ListProvidersService(fakeUsersRepository, fakeRedisCacheProvider);
  });

  it('should be able to show list the providers', async () => {

    const user1 = await fakeUsersRepository.create({
      name: 'User1',
      email: 'users1@gmail.com',
      password: '123'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User2',
      email: 'users2@gmail.com',
      password: '12'
    });

    const loggerdUser = await fakeUsersRepository.create({
      name: 'User3',
      email: 'users3@gmail.com',
      password: '1'
    });

    const providers = await listProvidersService.execute({
      user_id: loggerdUser.id,
    });

    expect(providers).toEqual([
      user1, user2
    ]);
  });

});
