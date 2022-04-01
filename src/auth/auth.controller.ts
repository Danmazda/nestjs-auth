import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signin')
  async signinLocal() {
    await this.authService.signinLocal();
  }

  @Post('/local/signup')
  async signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    await this.authService.signupLocal(dto);
  }

  @Post('/logout')
  async logoutLocal() {
    await this.authService.logoutLocal();
  }

  @Post('/refresh')
  async refreshTokens() {
    await this.authService.refreshTokens();
  }
}
