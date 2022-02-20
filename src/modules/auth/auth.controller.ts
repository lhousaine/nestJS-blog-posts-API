import { Role } from 'src/common/helpers/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthService } from './auth.service';
import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from 'src/common/helpers/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getProfile(@Request() req) {
    return req.user;
  }
}
