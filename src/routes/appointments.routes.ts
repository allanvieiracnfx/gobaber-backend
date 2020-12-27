import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointementService';
import esureAtheticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(esureAtheticated);

appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(AppointmentRepository);

  return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ provider_id, date: parsedDate })


  return response.json(appointment);

});

export default appointmentsRouter;
