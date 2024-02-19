import { User } from "../entities/user.entity";
import { IUserRepository } from "../interface/user-repository.interface";
import { FakeBaseRepository } from "./base-reposity.interface";

export class FakeUserRepository extends FakeBaseRepository<User> implements IUserRepository { }