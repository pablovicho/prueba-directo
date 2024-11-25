import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidateNumberMiddleware } from './validate-number.middleware';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport  } from '@nestjs/microservices';

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
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateNumberMiddleware).forRoutes('*');
  }
}