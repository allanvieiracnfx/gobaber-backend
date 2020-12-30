import { Router } from 'express';

import esureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../../controllers/ProvidersController';

const providerRouter = Router();
const providersController = new ProvidersController();

providerRouter.use(esureAtheticated);
providerRouter.get('/', providersController.index);

export default providerRouter;
