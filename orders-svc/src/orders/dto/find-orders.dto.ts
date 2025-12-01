import { IsEmpty, IsEnum, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";
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
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsIn(['createdAt'])
    sortBy?: 'createdAt' = 'createdAt'

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortDir?: 'ASC' | 'DESC' = 'DESC'
}