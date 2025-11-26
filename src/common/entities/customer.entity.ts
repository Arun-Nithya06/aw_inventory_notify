import { Entity, Column, OneToMany, Unique, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop } from './shop.entity';

@Entity('customers')
export class Customer extends BaseTable {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => ShopCustomer, (sc) => sc.customer)
  shopCustomers: ShopCustomer[];
}

@Entity('shop_customers')
@Unique(['shop', 'customer'])
export class ShopCustomer extends BaseTable {
  @ManyToOne(() => Shop, (shop) => shop.shopCustomers)
  shop: Shop;

  @ManyToOne(() => Customer, (customer) => customer.shopCustomers)
  customer: Customer;

  @Column({ unique: false, nullable: true })
  shopifyCustomerId: string;
}
