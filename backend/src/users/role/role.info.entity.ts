import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class RoleInfo {
  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @PrimaryColumn()
  roleName: string;

  @Column()
  value: string;
}
