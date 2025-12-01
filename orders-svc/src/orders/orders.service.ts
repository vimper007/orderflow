import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem, OrderStatus } from './types/order.types';
import { FindOrdersDto } from './dto/find-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) { }

  // findAll() {
  //   return this.ordersRepository.find();
  // }

  async findAll(@Query() dto: FindOrdersDto) {
    const { limit = 10, page = 1, status, userId, sortBy = 'createdAt', sortDir = 'DESC' } = dto
    const where: any = {}
    const order:any = {}
    if (status) where.status = status
    if (userId) where.userId = userId
    if(sortBy) order.createdAt = sortDir
    const [orders, total] = await this.ordersRepository.findAndCount({
      where,
      take: limit,
      skip: (page * limit),
      order,
    })
    const lastPage = Math.ceil(total / limit)
    return {
      data: orders,
      count: total,
      page,
      items: limit,
      lastPage 
    }
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOneBy({ id })
    if(!order) throw new NotFoundException("Order not found!, Invalid Order Id")
    return this.ordersRepository.findOneBy({ id });
  }

  async updateStatus(id: number, newStatus: OrderStatus) {
    const order = await this.ordersRepository.findOneBy({ id });
    const allocateStatus = () => (this.ordersRepository.save({ ...order, status: newStatus, updatedAt: new Date() }))
    if (!order) throw new NotFoundException("Order not found!")
    const returnError = () => { throw new BadRequestException(`Status cannot be transitioned from ${order.status} to ${newStatus}`) }

    if (order.status === OrderStatus.Pending) {
      if (newStatus === OrderStatus.Cancelled || newStatus === OrderStatus.Confirmed) {
        return await allocateStatus()
      }
      else returnError()
    }

    else if (order.status === OrderStatus.Confirmed) {
      if (newStatus === OrderStatus.Completed) {
        return await allocateStatus()
      }
      else returnError()
    }

    else returnError()

  }

  create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.save(createOrderDto);
  }

  async delete(id: number) {
    const order = await this.ordersRepository.findOneBy({ id })
    if (!order) throw new NotFoundException(`Order with id ${id} does not exist`)
    return this.ordersRepository.delete(id)
  }

  // findByStatusOrUserId(status?: OrderStatus, userId?: string) {
  //   const where: any = {}
  //   if (status) where.status = status
  //   if (userId) where.userId = userId
  //   return this.ordersRepository.findBy(where)
  // }
}
// so the behaviour should be if either 1 param is there filter only by it, if both params are there filter by both, if any params is invalid throw an error with the wrong param, if no params return all orders