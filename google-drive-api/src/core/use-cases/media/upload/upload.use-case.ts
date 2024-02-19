import { IStorageProvider } from "src/core/providers/storage/storage.interface";
import { IMediaRepository } from "src/database/interface/media-repository.interface";

export class Upload {
  constructor(
    private readonly _mediaRepository: IMediaRepository,
    private readonly _storageProvider: IStorageProvider
  ) { }

  async execute(): Promise<any> {

  }
}