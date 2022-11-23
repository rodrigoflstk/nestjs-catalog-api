import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetMovieFilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  search?: string;
}
