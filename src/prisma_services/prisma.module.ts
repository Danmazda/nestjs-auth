import { Global, Module } from '@nestjs/common';

import { UserService } from './user.service';

import { ListService } from './list.service';

import { PrismaService } from './prisma.service';

import { PrismaController } from './prisma.controller';

// Module pega o serviço e o controller e exporta
@Global()
@Module({
  providers: [UserService, ListService, PrismaService],

  controllers: [PrismaController],
  exports: [PrismaService],
})
export class PrismaModule {}
