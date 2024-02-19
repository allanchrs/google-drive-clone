import { Media } from "../entities/media.entity";
import { IBaseRepository } from "./base-reposity.interface";

export abstract class IMediaRepository extends IBaseRepository<Media>{ }