import { IsEmpty, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { OrderStatus } from "../types/order.types";

export class FindOrdersDto {

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsString()
    userId?: string;

    // Pagination to limit data
    @IsOptional()
    @IsInt()
    @Min(0)
    offset?: number = 0;

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number = 10;
}