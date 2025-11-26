import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';

const isPostgres = process.env.DB_CLIENT === 'postgres'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot(
      isPostgres ?
        {
          type: 'postgres',
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '3000'),
          password: process.env.DB_PASS ?? "",
          username: process.env.DB_USER,
          entities: [Order]
        }
        :
        {
          type: 'sqljs',
          entities: [Order],
          synchronize: true,
        }
    ),

    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
