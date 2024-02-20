import { Media } from "../entities/media.entity";
import { IMediaRepository } from "../interface/media-repository.interface";
import { BaseRepository } from "./base-reposity";

export class MediaRepository extends BaseRepository<Media> implements IMediaRepository {
  constructor() {
    super(Media)
  }
}