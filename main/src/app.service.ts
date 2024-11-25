import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('PAIR_SERVICE') private readonly pairServiceClient: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.pairServiceClient.connect().then(() =>
      console.log('Connected to RabbitMQ')
    )

  }

  async getResults(number: number): Promise<any> {
    const results = await Promise.all([
      firstValueFrom(this.pairServiceClient.send('pair', number).pipe(
        timeout(5000),
        catchError((error) => {
          console.error('Error occurred: ', error);
          throw error;  // Rethrow the error for handling in the main function.
        })
      )),
      // firstValueFrom(this.client.send('prime', number).pipe(timeout(5000))),
      // this.client.send('factorial', number),
      // this.client.send('sum', number),
      // this.client.send('factors', number),
      // this.client.send('fibonacci', number),
    ]);
    console.log(results)

    return {
      pair: results[0],
      // prime: results[1],
      // factorial: results[2],
      // sum: results[3],
      // factors: results[4],
      // fibonacci: results[5],
    };

}
}
