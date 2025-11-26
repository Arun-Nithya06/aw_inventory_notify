import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Shop } from './shop.entity';

@Entity('inventory_webhook_logs')
export class InventoryWebhookLog extends BaseTable {
  @ManyToOne(() => Shop)
  shop: Shop;

  @Column()
  topic: string;

  @Column('uuid')
  webhookId: string;

  @Column({ type: 'jsonb' })
  payload: any;
}
