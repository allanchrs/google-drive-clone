import { IBaseRepository } from "../interface/base-reposity.interface";
import { mockRepositoryImplementation } from "./mock/mock.implementation";

export class FakeBaseRepository<Entity> implements IBaseRepository<Entity> {
  constructor() {
    mockRepositoryImplementation<Entity>(this);
  }
  save = jest.fn()
  delete = jest.fn()
  softDelete = jest.fn()
  findMany = jest.fn()
  findManyAndCount = jest.fn()
  findOne = jest.fn()
  find = jest.fn()
} 