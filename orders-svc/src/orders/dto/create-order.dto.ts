import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, Min, ValidateNested, ArrayMinSize } from "class-validator";

export class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @ArrayMinSize(1)
    items: OrderItemDto[];

    @IsNumber()
    @Min(0)
    totalAmount: number
}
