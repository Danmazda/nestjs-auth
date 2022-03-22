import { Injectable } from '@nestjs/common';

// injetável
@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the to do list REST API';
  }
}
