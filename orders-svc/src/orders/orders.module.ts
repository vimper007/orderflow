import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
const isPostgres = process.env.DB_CLIENT === 'postgres'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot(
      !isPostgres ?
        {
          type: 'postgres',
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '3000'),
          password: process.env.DB_PASS ?? "",
          username: process.env.DB_USER,
          entities: [Order],
          synchronize: true
        }
        :
        {
          type: 'sqljs',
          entities: [Order],
          // TODO Migratio
          synchronize: true,
        }
    ),

    TypeOrmModule.forFeature([Order]),

    ClientsModule.register([
      {
        name: 'KAFKA_ORDERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'KAFKA_CLIENT',
            brokers: ['localhost:9092'],
          },
          // https://www.telerik.com/blogs/how-to-integrate-kafka-nestjs-event-driven-microservices
          producer: {
            allowAutoTopicCreation: true, // Convenient for development
            idempotent: true, // Prevents the same message from being saved multiple times
            retry: {
              retries: 5,
              maxRetryTime: 30000,
            },
          },
        }
      },
    ]),

    OrdersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[OrdersService]
})

// @Module({
//     imports: [TypeOrmModule.forFeature([Order])],
//     providers: [OrdersService],
//     exports: [OrdersService],
//     controllers:[OrdersController]

// })
export class OrdersModule { }
