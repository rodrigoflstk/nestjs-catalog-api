import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AuthCredentialsDTO } from './dtos/auth.credentials-dto';
import { AuthService } from './user.service';
import { CreateUserDto } from './dtos/create.user-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User - Endpoints')
@Controller('user')
export class UserController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.logger.verbose(` New registered user: "${createUserDto.username}"`);
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ acessToken: string }> {
    this.logger.verbose(`"${authCredentialsDTO.username}" has logged in`);
    return this.authService.signIn(authCredentialsDTO);
  }
}
