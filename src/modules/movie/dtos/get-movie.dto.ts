import { IsOptional, IsString } from 'class-validator';

export class GetMovieFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
