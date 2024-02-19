import { User } from "../entities/user.entity";
import { IUserRepository } from "../interface/user-repository.interface";
import { BaseRepository } from "./base-reposity";

export class UserRepository extends BaseRepository<User> implements IUserRepository { }