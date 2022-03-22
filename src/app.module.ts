import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma_services/prisma.module';
import { TodolistModule } from './todolist/todolist.module';


// Decorar
// importa o módulo todolist
@Module({
  imports: [TodolistModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
