import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AuthCredentialsDTO } from './dtos/auth.credentials-dto';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    this.logger.verbose(
      ` New registered user: "${authCredentialsDTO.username}"`,
    );
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ acessToken: string }> {
    this.logger.verbose(`"${authCredentialsDTO.username}" has logged in`);
    return this.authService.signIn(authCredentialsDTO);
  }
}
