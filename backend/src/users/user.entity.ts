import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface RoleInfo {
  roleName: string;
  value: string;
}

@Entity()
export class User {
  // 사용자 아이디
  @PrimaryGeneratedColumn()
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

  // 권한
  @Column()
  roles: RoleInfo[];

  // 소개
  @Column()
  desc?: string;
}
