import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { Movie } from './entities/movie.entity';
import { User } from '../auth/entities/user.entity';
import { GetMovieFilterDto } from './dtos/get-movie.dto';
// import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('movie')
@UseGuards(AuthGuard())
export class MovieController {
  private logger = new Logger('MovieService', { timestamp: true });
  constructor(private readonly movieService: MovieService) {}

  @Post('/create')
  create(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    this.logger.verbose(`"${user.username}" has created a new movie.`);
    return this.movieService.create(createMovieDto, user);
  }

  @Get()
  findAll(
    @Query() getMovieFilterDto: GetMovieFilterDto,
    @GetUser() user: User,
  ): Promise<Movie[]> {
    this.logger.verbose(`"${user.username}" is getting all movies.`);
    return this.movieService.findAll(getMovieFilterDto, user);
  }

  @Get(':uuid')
  findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @GetUser() user: User,
  ): Promise<Movie> {
    this.logger.verbose(`"${user.username}" is getting a movie.`);
    return this.movieService.findOne(uuid, user);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
  //   return this.movieService.update(+id, updateMovieDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
