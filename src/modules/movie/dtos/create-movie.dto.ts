import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  @IsString()
  cast: string;
}
