import { Router } from 'express';

import esureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../../controllers/AppointmentsController';
import ProviderAppointmentsController from '../../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(esureAtheticated);
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
