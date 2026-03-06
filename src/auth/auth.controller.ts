import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(
    @Body()
    body: {
      nom: string;
      prenom: string;
      email: string;
      password: string;
      role: string;
      departement?: string;
    },
  ) {
    return this.authService.register(
      body.nom,
      body.prenom,
      body.email,
      body.password,
      body.role,
      body.departement,
    );
  }

  @Post('rfid-login')
  async rfidLogin(@Body() body: { rfid: string }) {
    return this.authService.rfidLogin(body.rfid);
  }
}
