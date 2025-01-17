import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

type jwtPayload = {
  userId: number
}


@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('REFRESH_TOKEN'),
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: jwtPayload) {
    const refreshToken = req.get("authorization").replace('Bearer', '').trim()
    return {
        ...payload,
        refreshToken
    };
  }

  
}
