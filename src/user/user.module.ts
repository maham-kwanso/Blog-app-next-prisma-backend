import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    // UserResolver, 
    UserService, PrismaService],
  exports: [UserService],
})
export class UserModule { }

