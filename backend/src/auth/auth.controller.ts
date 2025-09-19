import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: any) {
    try {
      const hashed = await bcrypt.hash(body.password, 10);
      return await this.usersService.create({ ...body, password: hashed });
    } catch (error: any) {
      // Prisma lança P2002 se email já existir
      if (error.code === 'P2002') {
        throw new ConflictException('Email já cadastrado');
      }
      // qualquer outro erro
      throw error;
    }
  }


  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
