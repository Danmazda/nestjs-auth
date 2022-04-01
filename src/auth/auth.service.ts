import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_services/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.types';
import { JwtService } from '@nestjs/jwt';
import { prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        { secret: 'rt-secret', expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateHashRt(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Acccess Denied');
    const compare = await bcrypt.compare(dto.password, user.hash);
    if (!compare) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateHashRt(user.id, tokens.refresh_token);
    return tokens;
  }

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateHashRt(newUser.id, tokens.refresh_token);
    return tokens;
  }

  //updateMany porque update só aceita campos unique
  async logoutLocal(userId: number) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens() {}
}
