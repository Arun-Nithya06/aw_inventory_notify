import { Entity, Column, OneToMany } from 'typeorm';
import { BaseTable } from './base.entity';
import { ShopCustomer } from './customer.entity';

@Entity('shops')
export class Shop extends BaseTable {
  @Column({ unique: true })
  shopDomain: string;

  @Column({ type: 'text', nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  scopes: any;

  @OneToMany(() => ShopCustomer, (sc) => sc.shop)
  shopCustomers: ShopCustomer[];
}
