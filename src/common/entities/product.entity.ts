import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop, ShopRelation } from './shop.entity';

@Entity('products')
export class Product extends BaseTable implements ShopRelation {
  @ManyToOne(() => Shop, { nullable: false })
  shop: Shop;

  @Column({ type: 'bigint' })
  shopifyProductId: number;
}
