/* eslint-disable prettier/prettier */
import { SignedInUser } from '../../auth/dto/signed-in-user.dto';

export interface JwtPayload extends SignedInUser {
    iat: number;
    exp: number;
}
