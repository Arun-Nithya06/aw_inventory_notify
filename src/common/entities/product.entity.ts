import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop } from './shop.entity';

@Entity('products')
export class Product extends BaseTable {
  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({ type: 'bigint' })
  shopifyProductId: number;
}
