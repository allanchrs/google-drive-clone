import { Media } from "../entities/media.entity";
import { IMediaRepository } from "../interface/media-repository.interface";
import { FakeBaseRepository } from "./base-reposity.interface";

export class FakeMediaRepository extends FakeBaseRepository<Media> implements IMediaRepository { }