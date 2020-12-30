
import esureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(esureAtheticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);


export default profileRouter;
