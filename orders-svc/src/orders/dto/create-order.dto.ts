import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { OrderItem, OrderStatus } from "../types/order.types";

export class CreateOrderDto {
    
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    items: OrderItem[];

    // @IsEnum(OrderStatus)
    // status:OrderStatus

    @IsNumber()
    @Min(0)
    totalAmount: number
}