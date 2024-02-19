import { User } from "../entities/user.entity";
import { IBaseRepository } from "./base-reposity.interface";

export abstract class IUserRepository extends IBaseRepository<User>{ }