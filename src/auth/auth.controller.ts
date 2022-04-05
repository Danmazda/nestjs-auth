import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/commons/decorators';
import { AtGuard, RtGuard } from 'src/commons/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.signinLocal(dto);
  }

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.signupLocal(dto);
  }

  @Post('/logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  async logoutLocal(@GetCurrentUser('sub') userId: number) {
    return await this.authService.logoutLocal(userId);
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') rt: string,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(userId, rt);
  }
}
