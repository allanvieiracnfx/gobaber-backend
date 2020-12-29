import { container } from 'tsyringe';

import IStorageProvider from './StoregeProvider/models/IStorageProvider';
import DiskStoregeProvider from './StoregeProvider/implementations/DiskStoregeProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStoregeProvider);
