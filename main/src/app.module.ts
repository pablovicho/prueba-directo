import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport  } from '@nestjs/microservices';

import { ValidateNumberMiddleware } from './validate-number.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingService } from './Logs/logging.service';
import { LoggingMiddleware } from './Logs/logging.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingService,
    {
      provide: 'PAIR_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'pair_queue',
            queueOptions: {
              durable: false,
            }
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: 'PRIME_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'prime_queue',
            queueOptions: {
              durable: false,
            }
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: 'FACTORIAL_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'factorial_queue',
            queueOptions: {
              durable: false,
            }
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: 'ADDITION_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'addition_queue',
            queueOptions: {
              durable: false,
            }
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: 'FACTORS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'factors_queue',
            queueOptions: {
              durable: false,
            }
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: 'FIBONACCI_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'fibonacci_queue',
            queueOptions: {
              durable: false,
            }
          },
        })
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggingService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateNumberMiddleware, LoggingMiddleware)
    .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}