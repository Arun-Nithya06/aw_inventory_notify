import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop } from './shop.entity';

@Entity('locations')
export class Location extends BaseTable {
  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({ type: 'bigint' })
  shopifyLocationId: number;
}
