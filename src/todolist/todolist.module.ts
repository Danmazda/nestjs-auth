import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
// Module pega o serviço e o controller e exporta
@Module({
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}
