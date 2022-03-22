import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { List, Prisma } from '@prisma/client';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async list(
    listWhereUniqueInput: Prisma.ListWhereUniqueInput,
  ): Promise<List | null> {
    return this.prisma.list.findUnique({
      where: listWhereUniqueInput,
    });
  }

  async lists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<List[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.list.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createList(data: Prisma.ListCreateInput): Promise<List> {
    return this.prisma.list.create({
      data,
    });
  }

  async updateList(params: {
    where: Prisma.ListWhereUniqueInput;
    data: Prisma.ListCreateInput;
  }): Promise<List> {
    const { where, data } = params;
    return this.prisma.list.update({
      where,
      data,
    });
  }

  async deleteList(params: {
    where: Prisma.ListWhereUniqueInput;
  }): Promise<List> {
    const { where } = params;
    return this.prisma.list.delete({
      where,
    });
  }
}
