import { request, response, Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import esureAtheticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.excute({
    name,
    email,
    password,
  });

  user.password = '';

  return response.json(user);

});

usersRouter.patch(
  '/avatar',
  esureAtheticated,
  upload.single('avatar'),
  async (request, response) => {

    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    user.password = '';
    return response.json(user);

  });


export default usersRouter;
