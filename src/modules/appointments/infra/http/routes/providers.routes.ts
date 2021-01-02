import { Router } from 'express';

import esureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../../controllers/ProviderMonthAvailabilityController';

const providerRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providerRouter.use(esureAtheticated);
providerRouter.get('/', providersController.index);
providerRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
providerRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default providerRouter;
