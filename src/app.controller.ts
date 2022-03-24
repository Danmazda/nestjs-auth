import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //                           coloca o injetável como argumento
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test2')
  acao(): string {
    return 'Olá essa é o novo path';
  }
}
