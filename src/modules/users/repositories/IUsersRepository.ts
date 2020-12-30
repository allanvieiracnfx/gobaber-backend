import IFindAllProviders from "@modules/appointments/dtos/IFindAllProviders";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/Users";

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProviders): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
