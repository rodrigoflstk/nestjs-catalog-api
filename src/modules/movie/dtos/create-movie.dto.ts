import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  cast: string;
}
