import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop } from './shop.entity';

@Entity('inventory_levels')
export class InventoryLevel extends BaseTable {
  @ManyToOne(() => Shop)
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
