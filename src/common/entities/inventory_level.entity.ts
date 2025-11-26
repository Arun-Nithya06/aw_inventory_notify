import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop, ShopRelation } from './shop.entity';

@Entity('inventory_levels')
export class InventoryLevel extends BaseTable implements ShopRelation {
  @ManyToOne(() => Shop, { nullable: false })
  shop: Shop;

  @Column({ type: 'bigint' })
  inventoryItemId: number;

  @Column({ type: 'bigint' })
  locationId: number;

  @Column()
  available: number;

  @Column()
  updatedAtShopify: Date;
}
