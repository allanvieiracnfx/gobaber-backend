import User from "../models/Users";
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../error/AppError';

interface Request{
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  public async excute({name, email, password} : Request): Promise<User> {

    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({
      where: { email },
    });

    if(checkUserExist){
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;

  }

}

export default CreateUserService;
