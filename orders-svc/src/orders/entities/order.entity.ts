import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem, OrderStatus } from '../types/order.types';

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  // postgres
  @Column({ type: 'jsonb' })

  // sqljs
  // @Column({ type: 'simple-json' })
  items: OrderItem[];

  // postgres
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })

  // sqljs
  // @Column({ type: 'text', default: OrderStatus.Pending })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
