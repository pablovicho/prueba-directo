import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { LoggingService as Logger } from './Logs/logging.service';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URL')],
      prefetchCount: 1,
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  
  await app.startAllMicroservices();
  await app.listen(configService.get('SERVICE_PORT'));
  logger.log(`User service running on port ${configService.get('SERVICE_PORT')}`);
}
bootstrap();



