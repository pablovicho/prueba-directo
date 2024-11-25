import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class PrimeService {
  @MessagePattern('prime')
  isPrime(number: number): boolean {
    if (number < 2) {
      return false;
    }
    for (let i = 2; i < (number/2); i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }
}