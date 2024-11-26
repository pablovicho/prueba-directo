import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { ResponseDTO } from './responseDTO';
import { LoggingService as Logger } from './Logs/logging.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('PAIR_SERVICE') private readonly pairServiceClient: ClientProxy,
    @Inject('PRIME_SERVICE') private readonly primeServiceClient: ClientProxy,
    @Inject('FACTORIAL_SERVICE') private readonly factorialServiceClient: ClientProxy,
    @Inject('ADDITION_SERVICE') private readonly additionServiceClient: ClientProxy,
    @Inject('FACTORS_SERVICE') private readonly factorsServiceClient: ClientProxy,
    @Inject('FIBONACCI_SERVICE') private readonly fibonacciServiceClient: ClientProxy,
    private readonly logger: Logger
  ) {}

  async onModuleInit() {
    await this.pairServiceClient.connect()
    await this.primeServiceClient.connect()
    await this.factorialServiceClient.connect()
    await this.additionServiceClient.connect()
    await this.factorsServiceClient.connect()
    await this.fibonacciServiceClient.connect()
      this.logger.log('Connected to RabbitMQ');
  }

  async getResults(number: number): Promise<ResponseDTO> {
    const results = await Promise.all([
      firstValueFrom(this.pairServiceClient.send('pair', number).pipe(
        timeout(5000),
        catchError((error) => {
          this.logger.error('Error occurred: ', error);
          throw error;  // Rethrow the error for handling in the main function.
        })
      )),
      firstValueFrom(this.primeServiceClient.send('prime', number).pipe(
        timeout(5000),
        catchError((error) => {
          this.logger.error('Error occurred: ', error);
          throw error;  // Rethrow the error for handling in the main function.
        })
      )),
      firstValueFrom(this.factorialServiceClient.send('factorial', number).pipe(
        timeout(5000),
        catchError((error) => {
          this.logger.error('Error occurred: ', error);
          throw error;  // Rethrow the error for handling in the main function.
        })
      )),
      firstValueFrom(this.additionServiceClient.send('addition', number).pipe(
        timeout(5000),
        catchError((error) => {
          this.logger.error('Error occurred: ', error);
          throw error;  // Rethrow the error for handling in the main function.
        })
      )),
      firstValueFrom(this.factorsServiceClient.send('factors', number).pipe(
        timeout(5000),
        catchError((error) => {
          this.logger.error('Error occurred: ', error);
          throw error;  // Rethrow the error for handling in the main function.
        })
      )),
      firstValueFrom(this.fibonacciServiceClient.send('fibonacci', number).pipe(
        timeout(5000),
        catchError((error) => {
          this.logger.error('Error occurred: ', error);
          throw error;  // Rethrow the error for handling in the main function.
        })
      )),
    ]);

    return {
      pair: results[0],
      prime: results[1],
      factorial: results[2],
      sumN: results[3],
      factors: results[4],
      fibonacci: results[5],
    };

}
}
