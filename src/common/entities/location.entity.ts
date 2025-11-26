import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop, ShopRelation } from './shop.entity';

@Entity('locations')
export class Location extends BaseTable implements ShopRelation {
  @ManyToOne(() => Shop, { nullable: false })
  shop: Shop;

  @Column({ type: 'bigint' })
  shopifyLocationId: number;
}
