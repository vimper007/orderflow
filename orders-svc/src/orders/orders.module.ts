import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { KafkaProducerService } from 'src/kafka/kafka-producer/kafka-producer.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order]), KafkaModule],
    providers: [OrdersService],
    exports: [OrdersService],
    controllers:[OrdersController]

})
export class OrdersModule { }
