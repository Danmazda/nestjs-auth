import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ListService } from './list.service';
import { User as UserModel, List as ListModel } from '@prisma/client';

@Controller()
export class PrismaController {
  constructor(
    private readonly userService: UserService,
    private readonly listService: ListService,
  ) {}

  @Get('list/:id')
  async getListById(@Param('id') id: string): Promise<ListModel> {
    return this.listService.list({ id: Number(id) });
  }

  @Get('list')
  async getAllLists(): Promise<ListModel[]> {
    return this.listService.lists({});
  }

  @Post('list')
  async createList(
    @Body() listData: { text: string; userId?: number },
  ): Promise<ListModel> {
    const { text, userId } = listData;
    return this.listService.createList({
      text,
      User: {
        connect: { id: userId },
      },
    });
  }

  @Post('user')
  async signupUser(@Body() userData: { email: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('list/:id')
  async updateList(
    @Param('id') id: string,
    @Body() userData: { text: string },
  ): Promise<ListModel> {
    return this.listService.updateList({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete('post/:id')
  async deleteList(@Param('id') id: string): Promise<ListModel> {
    return this.listService.deleteList({ where: { id: Number(id) } });
  }
}
