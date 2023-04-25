import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleInfo } from './role/role.info.entity';

@Entity()
export class User {
  // 사용자 아이디
  @PrimaryColumn()
  userId: string;

  // 사용자 이름
  @Column()
  username: string;

  // 실제 이름
  @Column()
  realName: string;

  // 화신
  @Column()
  avatar: string;

  // 권한;
  @OneToMany(() => RoleInfo, (role) => role.user)
  roles: RoleInfo[];

  // 소개
  @Column()
  desc?: string;
}
