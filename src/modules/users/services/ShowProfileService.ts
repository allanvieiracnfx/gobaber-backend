import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }


  public async execute({ user_id }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    user.password = '';

    return user;
  }

}

export default ShowProfileService;
