import FakeNotificationsRepository from '@modules/notifications/repositories/fake/FakeNotificationsRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeRedisCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointementService';

describe('CreateAppointment', () => {

  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let createAppointment: CreateAppointmentService;
  let createProvider: CreateUserService;
  let fakeHashProvider: FakeHashProvider;
  let userRepository: FakeUsersRepository;
  let fakeNotificationsRepository: FakeNotificationsRepository;
  let fakeRedisCacheProvider: FakeRedisCacheProvider;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeHashProvider = new FakeHashProvider();
    userRepository = new FakeUsersRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeRedisCacheProvider = new FakeRedisCacheProvider();

    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, userRepository, fakeNotificationsRepository,fakeRedisCacheProvider)
    createProvider = new CreateUserService(userRepository, fakeHashProvider, fakeRedisCacheProvider);

  });

  it('should be able to create a new appointment', async () => {

    const provider = await createProvider.execute({ name: 'Teste', email: 'teste@teste.com.br', password: '123' });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '222',
      provider_id: provider.id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider.id);

  });

  it('should not be able to create two appointment on the same time', async () => {

    const provider = await createProvider.execute({ name: 'Teste', email: 'teste@teste.com.br', password: '123' });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '222',
      provider_id: provider.id,
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '222',
        provider_id: '123425',
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointments on a past date', async () => {

    const provider = await createProvider.execute({ name: 'Teste', email: 'teste@teste.com.br', password: '123' });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '222',
        provider_id: provider.id,
      })
    ).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointments with same user as provider', async () => {

    const provider = await createProvider.execute({ name: 'Teste', email: 'teste@teste.com.br', password: '123' });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: provider.id,
        provider_id: provider.id,
      })
    ).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointments with non-existing provider', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123425',
        provider_id: 'non-existing',
      })
    ).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointments before 8am and after 5pm', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'user_id',
        provider_id: 'provider_id',
      })
    ).rejects.toBeInstanceOf(AppError);

  });

});
