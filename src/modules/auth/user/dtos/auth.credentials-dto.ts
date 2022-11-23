import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

class AuthCredentialsDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  password: string;
}

export { AuthCredentialsDTO };
