import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface Tag {
  key: string;
  label: string;
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
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

  @Column()
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
