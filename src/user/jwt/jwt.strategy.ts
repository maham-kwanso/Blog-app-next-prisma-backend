import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignedInUser } from '../auth/dto/signed-in-user.dto';
import { JwtPayload } from './dto/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'jwtConstants.secret',
    });
    // console.log(
    //   "this.configService.get('') : ",
    //   configService.get('JWT_SECRET'),
    // );
  }

  async validate(payload: JwtPayload) {
    const { id, name, username } = payload;
    const user: SignedInUser = {
      id,
      name,
      username,
    };
    return user;
  }
}
