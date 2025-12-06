// Order domain shared types
export interface OrderItem {
  productId: string;
  quantity: number;
}

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Completed = 'completed',
  Reserved = 'reserved'
}

export interface Order {
  id: number;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}
