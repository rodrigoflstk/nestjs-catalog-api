import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsString,
  Matches,
  IsEmail,
} from 'class-validator';

class CreateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  @MaxLength(80)
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  @MaxLength(80)
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password is too weak, try especial characters or uppercase letters',
  })
  password: string;
}

export { CreateUserDto };
