import { Router } from 'express';

import esureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../../controllers/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(esureAtheticated);
const appointmentsController = new AppointmentsController();

appointmentsRouter.get('/', async (request, response) => {

  //  return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
