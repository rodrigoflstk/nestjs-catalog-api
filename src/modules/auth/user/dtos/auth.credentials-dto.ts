import { IsString, MaxLength, MinLength } from 'class-validator';

class AuthCredentialsDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}

export { AuthCredentialsDTO };
