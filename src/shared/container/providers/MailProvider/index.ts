import { container } from "tsyringe";
import EtherealMailProvider from "./implamentatios/EtherealMailProvider";
import SESMailProvider from "./implamentatios/SESMailProvider";
import IMailProvider from "./models/IMailProvider";
import mailConfig from '@config/mail'



const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider', providers[mailConfig.driver]);
