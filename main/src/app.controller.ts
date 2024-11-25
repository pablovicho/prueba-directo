import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/number')
  async processNumber(@Body('number') number: number) {
    return this.appService.getResults(number);
  }
}
