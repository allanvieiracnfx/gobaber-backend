import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointementService';

describe('CreateAppointment', () => {

  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let createAppointment: CreateAppointmentService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123425',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123425');

  });

  it('should not be able to create two appointment on the same time', async () => {

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123425',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123425',
      })
    ).rejects.toBeInstanceOf(AppError)
  });
});
