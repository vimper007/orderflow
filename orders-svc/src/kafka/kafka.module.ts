import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "KAFKA_ORDERS_SERVICE",
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'orders-kafka-client',
                        brokers: ['localhost:9092'],
                    },
                    producer: {
                        allowAutoTopicCreation: true,
                        idempotent: true,
                        retry: {
                            retries: 5,
                            maxRetryTime: 30000,
                        }
                    }
                }
            },
        ]),
    ],
    providers: [KafkaProducerService],
    exports: [KafkaProducerService]
})
export class KafkaModule { }
