import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { plainToClass } from 'class-transformer';
import { CurrentUser } from './CurrentUser.decorator';
import { EditPasswordDto } from './dto/edit-password.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register',
    description: 'Register an user account successfully',
  })
  @ApiBody({
    description: 'User account to register',
    schema: {
      type: 'object',
      required: ['email', 'password', 'firstName', 'lastName'],
      properties: {
        email: { type: 'string', example: 'do222@om141ai5l1.com' },
        password: { type: 'string', example: 'Abc12345+' },
        firstName: { type: 'string', example: 'David' },
        lastName: { type: 'string', example: 'Beckham' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Register an user account successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto) {
    const registerData = plainToClass(AuthRegisterDto, authRegisterDto);
    return this.authService.register(registerData);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Login an user account successfully',
  })
  @ApiBody({
    description: 'User account to login',
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', example: 'triptribeuser@triptribe.com' },
        password: { type: 'string', example: 'Abc123456+' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Login an user account successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Refresh Token',
    description: 'Refresh Token successfully',
  })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Token to refresh',
  })
  @ApiResponse({ status: 201, description: 'Refresh Token successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('refreshToken')
  refreshToken(@Body() params: RefreshTokenDto) {
    return this.authService.refreshToken(params.refreshToken);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit Password',
    description: 'Edit Password successfully',
  })
  @ApiBody({
    type: EditPasswordDto,
    description: 'New Password to edit',
  })
  @ApiResponse({ status: 201, description: 'Edit Password successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('password')
  @UseGuards(AuthGuard('jwt'))
  async editPassword(@CurrentUser() currentUser, @Body() newPassword: EditPasswordDto) {
    const userId = currentUser._id;
    return await this.authService.editPassword(userId, newPassword);
  }
}
