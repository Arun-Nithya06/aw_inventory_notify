import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseTable } from './base.entity';
import { Product } from './product.entity';

@Entity('product_variants')
export class ProductVariant extends BaseTable {
  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'bigint' })
  inventoryItemId: number;
}
