import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './types/order.types';
import { FindByStatusOrUserIdDto } from './dto/find-by-status-userId.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  findByStatusOrUserId(@Query() { status, userId }: FindByStatusOrUserIdDto) {
    if(!status && !userId) return this.ordersService.findAll()
    return this.ordersService.findByStatusOrUserId(status, userId)
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto.status)
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Delete("/:id")
  delete(
    @Param("id") id: number
  ) {
    return this.ordersService.delete(id)
  }

}
