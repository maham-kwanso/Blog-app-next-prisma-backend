import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // creates user in the database signUp
  async create(createUserInput: CreateUserInput, verificationToken: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
      return await this.prisma.user.create({
        data: {
          ...createUserInput,
          password: hashedPassword,
          verificationToken,
        },
      });
    } catch (error) {
      console.log('error while creating user in UserService :: ', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  // check for existing username
  async findOne(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByToken(verificationToken: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { verificationToken } });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  // display all users with the posts, comments, and categories
  // async profile(id: number): Promise<User | null> {
  //   try {
  //     return await this.prisma.user.findUnique({
  //       where: { id },
  //       include: {
  //         posts: {
  //           include: {
  //             categories: true,
  //             comments: true,
  //           },
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(
  //       { message: error.message, statusCode: error.status },
  //       error.status,
  //     );
  //   }
  // }

  async updateVerificationStatus(token: string) {
    try {
      const user = await this.findOneByToken(token);
      if (!user) {
        throw new NotFoundException('Invalid Token');
      }
      await this.prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: error.message, statusCode: error.status },
        error.status,
      );
    }
  }
}
