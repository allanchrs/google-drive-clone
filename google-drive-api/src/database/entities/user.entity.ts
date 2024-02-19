import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Media } from "./media.entity";

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email!: string

  @Column()
  name!: string

  @Column()
  passsword!: string

  @OneToMany(() => Media, media => media.user)
  @JoinColumn({ referencedColumnName: 'user_id' })
  medias?: Media[]
}