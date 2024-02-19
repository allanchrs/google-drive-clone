export abstract class IBaseRepository<Entity> {
  abstract save(entity: Partial<Entity>): Promise<Entity>;
  abstract delete(id: string): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
  abstract findMany(): Promise<Entity[]>;
  abstract findManyAndCount(): Promise<{ list: Entity[]; count: number }>;
  abstract findOne(): Promise<Entity | null>;
  abstract find(entity: Partial<Entity>): this;
} 