import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';

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
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
