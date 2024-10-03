import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.types';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from './types/accesToken.types';
import { NewUserDto } from './dto/newUser.dto';
import { UserInfo } from './types/userInfo.types';
import { Rol } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async getTokens(id: number, name: string, role:Rol): Promise<Tokens> {
    const accessToken = await this.jwt.signAsync(
      { id, name, role },
      {
        secret: this.config.get('ACCESS_TOKEN'),
        expiresIn: 60 * 15 ,
      },
    );
    const refreshToken = await this.jwt.signAsync(
      { id, name, role },
      {
        secret: this.config.get('REFRESH_TOKEN'),
        expiresIn: 60 * 60 * 24 * 7,
      },
    );
    return { accessToken, refreshToken };
  }

  async signUp(dto: NewUserDto): Promise<UserInfo>  {
    const foundUser = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (foundUser) throw new ConflictException('Usuario ya registrado');
    const hash = await bcrypt.hash(dto.password,10)
    const newUser = await this.prisma.user.create({
      data: { name: dto.user, hash, email: dto.email},
    });
    const tokens = await this.getTokens(newUser.id, newUser.name, newUser.rol)
    return {...tokens, user: newUser.name, role: newUser.rol}
  }

  async logIn(dto: AuthDto): Promise<UserInfo>  {
    const foundUser = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!foundUser) throw new ForbiddenException('acceso denegado');
    const passwordMatch = await bcrypt.compare(dto.password, foundUser.hash);
    if (!passwordMatch) throw new ForbiddenException('acceso denegado');
    const tokens = await this.getTokens(foundUser.id, foundUser.name, foundUser.rol);
    await this.prisma.user.update({where: {id: foundUser.id},data:{refreshToken: tokens.refreshToken}})
    return {...tokens, user: foundUser.name, role: foundUser.rol}
  }

  async logOut(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: id },
      data: { refreshToken: null },
    });
  }

  async refresh(id: number, refreshToken: string): Promise<AccessToken> {
    const userFound = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!userFound) throw new ForbiddenException('Acceso denegado');
    const tokenMatch = refreshToken === userFound.refreshToken;
    
    if (!tokenMatch) throw new ForbiddenException('Acceso denegado');
    const output = await this.getTokens(userFound.id, userFound.name, userFound.rol);
    return { accessToken: output.accessToken };
  }
}
