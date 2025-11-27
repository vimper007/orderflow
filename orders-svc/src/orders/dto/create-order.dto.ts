import { OrderItem } from "../types/order.types";

export class CreateOrderDto {
    userId: string;
    items: OrderItem[];
    totalAmount: number
}