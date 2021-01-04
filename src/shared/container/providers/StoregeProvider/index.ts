import { container } from "tsyringe";
import DiskStoregeProvider from "./implementations/DiskStoregeProvider";
import S3StorageProvider from "./implementations/S3StorageProvider";
import IStorageProvider from "./models/IStorageProvider";
import uploadConfig from '@config/upload';

const providers = {
  disk: DiskStoregeProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>('StorageProvider', providers[uploadConfig.driver]);
