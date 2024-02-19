import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { MediaEntity } from "./media.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  email!: string

  @Column()
  name!: string

  @Column()
  passsword!: string

  @OneToMany(() => MediaEntity, media => media.user)
  @JoinColumn({ referencedColumnName: 'user_id' })
  medias?: MediaEntity[]
}