import { container } from 'tsyringe';

import IStorageProvider from './StoregeProvider/models/IStorageProvider';
import DiskStoregeProvider from './StoregeProvider/implementations/DiskStoregeProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implamentatios/EtherealMailProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStoregeProvider);
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);
container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));
