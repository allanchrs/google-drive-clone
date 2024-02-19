export abstract class BaseRepository<T> {
  abstract save(entity: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
  abstract findMany(): Promise<T[]>;
  abstract findManyAndCount(): Promise<{ list: T[]; count: number }>;
  abstract findOne(): Promise<T | null>;
  abstract find(entity: Partial<T>): this;
} 