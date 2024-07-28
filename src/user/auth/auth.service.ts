import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user.service';
import { SignUpInput } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { SignedInUser } from './dto/signed-in-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(signUpInput: SignUpInput): Promise<User> {
    try {
      signUpInput.username = signUpInput.email;
      const { username } = signUpInput;
      const existingUser = await this.userService.findOne(username);
      if (existingUser) {
        throw new ConflictException('User Already Exists ! ');
      }
      const token = crypto.randomBytes(20).toString('hex');
      return await this.userService.create(signUpInput, token);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: error.message, statusCode: error.status },
        error.status,
      );
    }
  }

  async validateUser(username: string, pass: string): Promise<SignedInUser> {
    const user = await this.userService.findOne(username);
    if (user) {
      const password = await bcrypt.compare(pass, user?.password);
      if (password) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async signInUser(user: SignedInUser): Promise<string> {
    const { id, name, username } = user;
    const payload = { username, id, name };
    return this.jwtService.sign(payload);
  }
}
