import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(KafkaProducerService.name)
    constructor(
        @Inject('KAFKA_ORDERS_SERVICE') private readonly kafkaClient: ClientKafka,
    ) { }
    async onModuleInit() {
        try {
            await this.kafkaClient.connect();
            this.logger.log("Kafka Producer Client connected successfully", KafkaProducerService.name)
        } catch (error) {
            this.logger.error("Failed to connect Kafka Producer Client", KafkaProducerService.name)
        }
    }

    async onModuleDestroy() {
        await this.kafkaClient.close();
        this.logger.log("Kafka Producer Client disconnected", KafkaProducerService.name)
    }

    async sendMessage(topic: string, message: any) {
        this.logger.log({topic, message})
        return this.kafkaClient.emit(topic, message);
    }
}
