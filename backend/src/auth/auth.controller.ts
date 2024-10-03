import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.types';
import { AtGuard, RtGuard } from 'src/common/guards';
import { getCurrentUser } from 'src/common/decorators';
import { UserRefreshToken, UserToken } from './types/userToken.type';
import { AccessToken } from './types/accesToken.types';
import { NewUserDto } from './dto/newUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('Signup')
  Signup(@Body() dto: NewUserDto): Promise<Tokens>  {
    return this.authService.signUp(dto);
  }

  @Post('login')
  logIn(@Body() dto: AuthDto): Promise<Tokens>  {
    return this.authService.logIn(dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  logOut(@getCurrentUser() user: UserToken): Promise<void>  {
    return this.authService.logOut(user.id);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  refresh(@getCurrentUser() user: UserRefreshToken): Promise<AccessToken>  {
    return this.authService.refresh(user.id, user.refreshToken);
  }
}
