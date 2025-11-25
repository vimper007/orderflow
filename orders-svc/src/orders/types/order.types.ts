// Order domain shared types
export interface OrderItem {
  productId: string;
  quantity: number;
}

export enum OrderStatus {
  Pending = 'pending',
  Reserved = 'reserved',
  Failed = 'failed',
  Cancelled = 'cancelled',
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
