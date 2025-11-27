import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private readonly ordersRepository: Repository<Order>) { }

    findAll() {
        return this.ordersRepository.find()
    }

    create(createOrderDto: CreateOrderDto) {
        return this.ordersRepository.save(createOrderDto)
    }
}
