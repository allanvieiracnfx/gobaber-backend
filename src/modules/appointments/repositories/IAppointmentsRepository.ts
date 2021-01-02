import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayProviderDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {

  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayProviderDTO): Promise<Appointment[]>;

}
