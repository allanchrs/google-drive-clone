import { UserEntity } from "../entities/user.entity";
import { BaseRepository } from "./base-reposity.interface";

export abstract class UserRepository extends BaseRepository<UserEntity>{ }