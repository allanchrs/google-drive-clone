import { ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";
import { dataSource } from "../data-source";

export class BaseRepository<Entity extends ObjectLiteral> {
  protected repository: Repository<Entity>;

  protected query: SelectQueryBuilder<Entity>;

  constructor(private readonly Entity: new () => any) {
    this.repository = new Repository<Entity>(Entity, dataSource.manager);
    this.query = this.repository.createQueryBuilder();
  }

  async save(entity: Partial<Entity>): Promise<Entity> {
    return await this.repository.save(entity as Entity)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findMany(): Promise<Entity[]> {
    return await this.query.getMany();
  }
  async findManyAndCount(): Promise<{ list: Entity[]; count: number }> {
    const [list, count] = await this.query.getManyAndCount();

    return { list, count }
  }
  async findOne(): Promise<Entity | null> {
    return await this.query.getOne()
  }

  find(entity: Partial<Entity>): this {
    this.query = this.repository.createQueryBuilder();

    return this;
  }
} 