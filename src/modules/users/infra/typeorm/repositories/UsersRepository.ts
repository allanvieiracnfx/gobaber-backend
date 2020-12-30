import { getRepository, Not, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import usersRouter from '../../http/routes/users.routes';
import IFindAllProviders from '@modules/appointments/dtos/IFindAllProviders';


class UsersRepository implements IUsersRepository {

  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async findAllProviders({ expect_user_id }: IFindAllProviders): Promise<User[]> {

    let users: User[];

    if (expect_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(expect_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;

  }


  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

}

export default UsersRepository;
