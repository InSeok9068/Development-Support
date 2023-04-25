import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Tag {
  @PrimaryColumn()
  key: string;

  @Column()
  label: string;

  @ManyToOne(() => Account, (account) => account.tags)
  account: Account;
}
