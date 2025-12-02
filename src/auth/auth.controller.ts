import { Controller, Post, Get, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // registro
  @Post('signup')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const { name, email, password } = body;

    // validar si email ya existe
    const exists = await this.authService.emailExists(email);
    if (exists) {
      throw new HttpException({ error: 'email ya existe' }, HttpStatus.FORBIDDEN);
    }

    // crear usuario
    const user = await this.authService.createUser(name, email, password);

    return {
      authToken: `token_${user._id}`,
      userId: user._id,
    };
  }

  // login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // buscar usuario
    const user = await this.authService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new HttpException({ error: 'credenciales invalidas' }, HttpStatus.FORBIDDEN);
    }

    return {
      authToken: `token_${user._id}`,
      userId: user._id,
    };
  }

  // obtener usuario
  @Get('me/:userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.authService.findById(userId);

    if (!user) {
      throw new HttpException({ error: 'usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}
