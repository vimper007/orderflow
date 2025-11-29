import { IsEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../types/order.types";

export class FindByStatusOrUserIdDto {

    @IsOptional()
    @IsEnum(OrderStatus) 
    status:OrderStatus;

    @IsOptional()
    @IsString()
    userId:string
}