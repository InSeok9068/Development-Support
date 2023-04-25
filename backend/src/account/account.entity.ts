import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Tag } from './account.tag.entity';

@Entity()
export class Account {
  @PrimaryColumn()
  userid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  signature: string;

  @Column()
  introduction: string;

  @Column()
  title: string;

  @Column()
  group: string;

  @OneToMany(() => Tag, (tag) => tag.account)
  tags: Tag[];

  @Column()
  notifyCount: number;

  @Column()
  unreadCount: number;

  @Column()
  country: string;

  @Column()
  address: string;

  @Column()
  phone: string;
}
