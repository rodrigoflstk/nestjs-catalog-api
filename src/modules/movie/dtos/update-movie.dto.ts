import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsNotEmpty()
  description: string;
}
