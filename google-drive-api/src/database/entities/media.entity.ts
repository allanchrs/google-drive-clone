import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity('medias')
export class Media extends BaseEntity {
  @Column()
  file_name!: string

  @Column()
  mimetype!: string

  @Column({ type: 'bigint' })
  size!: number

  @Column({ type: 'timestamp' })
  last_updated!: Date

  @Column({ nullable: true })
  key?: string

  @ManyToOne(() => User, user => user.medias)
  @JoinColumn({ name: 'user_id' })
  user?: User
}