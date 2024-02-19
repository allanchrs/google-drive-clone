export abstract class IStorageProvider {
  abstract store(file: any): Promise<any>;
}