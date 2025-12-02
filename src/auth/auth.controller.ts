import { Controller, Post, Get, Body, Param, HttpStatus, HttpException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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

    // crear usuario con JWT
    const { user, token } = await this.authService.createUser(name, email, password);
    
    return {
      authToken: token,
      userId: user._id,
    };
  }

  // login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // validar usuario y generar token
    const { user, token } = await this.authService.login(email, password);

    return {
      authToken: token,
      userId: user._id,
    };
  }

  // obtener usuario (protegido con JWT)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const user = await this.authService.findById(req.user.userId);

    if (!user) {
      throw new HttpException({ error: 'usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  // mantener endpoint antiguo por compatibilidad
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
