import { FakeBaseRepository } from "../base-reposity.interface"

export const mockRepositoryImplementation = <T>(repository: FakeBaseRepository<T>): void => {
  repository.find.mockImplementation(() => repository)
}