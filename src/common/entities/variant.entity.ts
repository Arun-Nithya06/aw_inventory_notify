import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { BaseTable } from './base.entity';

@Entity('product_variants')
export class ProductVariant extends BaseTable {
  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'bigint' })
  inventoryItemId: number;
}
